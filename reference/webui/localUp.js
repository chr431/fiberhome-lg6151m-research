define(["vue", "vue-i18n", "/lang/"+g_device_data.userLang+"/management_res.js"], function(Vue, VueI18n, lang){
    var messages = {};
    messages[g_device_data.userLang] = lang;
    var i18n = new VueI18n({
      locale: g_device_data.userLang,
      messages: messages
    })
    var view = '\
    <div>\
        <div class="page_title">\
            <div class="head_line">{{g_device_data.model_name == "LG6120E" ? $t(\'managemant.Up.title\') : $t(\'managemant.localUp.title\')}}</div>\
        </div>\
        <div class="page_content">\
            <el-form size="large" :label-position="g_this.label_position" class="form_fiex_box">\
                <el-form-item>\
                    <div v-if= "g_device_data.model_name == \'LG6120E\'" class="content_img"><img src="../static/image/up_6120E.png"></div>\
                    <div v-else class="content_img"><img src="../static/image/image_upgrade.png"></div>\
                    <div class="content_span"><span>{{$t(\'managemant.localUp.tip\')}}</span></div>\
                    <el-upload v-if="httpsFlag" ref="upload" \
                        :on-remove="removeFile" \
                        :before-upload="checkFile" \
                        :on-change="fileChange" \
                        :http-request="uploadFile" \
                        :limit="1" \
                        :multiple="false" \
                        :file-list="fileList" \
                        :auto-upload="false"> \
                        <el-button type="primary" @click="removeFile">{{$t(\'File.Select\')}}</el-button>\
                    </el-upload>\
                    <el-upload v-else ref="upload" \
                        :action="actionURL" \
                        :headers="headers" \
                        :on-success="updateSuccess" \
                        :on-error="updateFailed" \
                        :on-remove="removeFile" \
                        :before-upload="checkFile" \
                        :on-change="fileChange" \
                        :limit="1" \
                        :multiple="false" \
                        :file-list="fileList" \
                        :auto-upload="false"> \
                        <el-button type="primary" @click="removeFile">{{$t(\'File.Select\')}}</el-button>\
                    </el-upload>\
                    <el-button class="loaclUP_button" type="primary" @click="onApply" :disabled="fileList.length==\'0\'">{{$t(\'File.Upload\')}}</el-button>\
                </el-form-item>\
            </el-form>\
            <el-dialog \
                :title="$t(\'upload_hint\')" \
                :visible.sync="dialogVisible" \
                :close-on-click-modal="false"\
                :close-on-press-escape="false"\
                :show-close="false" \
                width="30%"> \
                <span v-html="upTips"></span>\
                <span slot="footer" class="dialog-footer">\
                    <el-button size="medium" v-if="showButton" type="primary" @click="dialogVisible = false">{{$t("upload_confirm")}}</el-button>\
                </span>\
            </el-dialog>\
        </div>\
    </div>'
    return Vue.extend({
        i18n: i18n,
        message: lang,
        template: view,
        data: function(){
            return {
                fileList: [],
                chunkSize: 10 * 1024 * 1024, /*分片大小 10 兆*/
                start: 0,
                end: 0,
                httpsFlag: location.protocol == "https:",
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Content-Type': 'multipart/form-data',
                    "FH-Upgrade-Api-Token": ""
                },
                upTips: "",
                dialogVisible: false,
                showButton: false,
                actionURL: requestupurl + "?action=upgradeimage&_=" + Math.random(),
                timeout: "",
            }
        },
        created: function(){
            openLoading();
            this.timeout = setTimeout(function(){
                closeLoading();
            })
        },
        beforeDestroy:function () {
            clearTimeout(this.timeout);
        },
        methods:{
            uploadFile: function(e) {
                var file = e.file;
                var that = this;
                var setObj = {
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    chunkNum: Math.ceil(file.size/this.chunkSize),
                    chunkSize: this.chunkSize
                };
                getToken().then(function(data) {
                    that.headers["FH-Upgrade-Api-Token"] = data.data.sessionid;
                    instance({
                        timeout: 30000,
                        method: "post",
                        url: requestupurl + "?action=uploadprepare&" + Math.random(),
                        headers: that.headers,
                        data: setObj
                    }).then(function(res) {
                        if (res.data && res.data.success && res.data.success == "true") {
                            that.start = 0,
                            that.end = Math.min(that.chunkSize, file.size);
                            that.sendBuff(file);
                        } else {
                            that.chunkUpdateFinish();
                        }
                    }).catch(function(e) {
                        that.chunkUpdateFinish();
                    });
                })
            },
            sendBuff: function(file) {
                var that = this;
                var chunkFile = file.slice(that.start, that.end);
                getToken().then(function(data) {
                    that.headers["FH-Upgrade-Api-Token"] = data.data.sessionid;
                    instance({
                        timeout: 30000,
                        method: "post",
                        url: requestupurl + "?action=chunkupload&" + Math.random(),
                        headers: that.headers,
                        data: chunkFile
                    }).then(function(res) {
                        if (res.data.upgradeResult != undefined){
                            that.chunkUpdateFinish(res.data);
                        } else {
                            if (that.end < file.size && res.data.success && res.data.success == "true") {
                                that.start = that.end;
                                that.end = Math.min(that.end + that.chunkSize, file.size);
                                that.sendBuff(file);
                            } else {
                                that.chunkUpdateFinish(res.data);
                            }
                        }
                    }).catch(function() {
                        that.chunkUpdateFinish();
                    });
                })
            },
            onApply: function(){
                refreshTimeout()
                if (this.httpsFlag) {
                    this.$refs.upload.submit();
                } else {
                    var that = this;
                    getToken().then(function(data){
                        that.headers["FH-Upgrade-Api-Token"] = data.data.sessionid;
                        that.$refs.upload.submit();
                    })
                }
               
            },
            chunkUpdateFinish: function(data) {
               if (data != undefined) {
                    if (data && data.success == "true" && data.upgradeResult == 0) {
                        this.doReboot()
                    } else {
                        this.$refs.upload.clearFiles();
                        this.upTips = this.$t("upload_failed");
                        this.dialogVisible = true;
                        this.showButton = true;
                    }
               }
            },
            updateSuccess: function(data){
                if (data.success == "true"){
                    this.doReboot()	
                }else{
                    this.upTips = this.$t("upload_failed");
                }
                this.showButton = true;
                this.$refs.upload.clearFiles()  //清空文件
            },
            updateFailed: function(data){
                this.upTips = this.$t("upload_failed");
                this.dialogVisible = true;
                this.showButton = true;
            },
            fileChange: function(file, fileList){
                if(this.fileList.length === 0)
                    this.fileList.push(fileList[0]);
            },
            removeFile: function(file, fileList){
                this.fileList = [];
            },
            checkFile: function(file){
                if (file.size/1024/1024 > 1024){
                    fh_alert(this.$t("upload_image_over1G"));
                    return false;
                } else {
                    this.upTips = this.$t("uploading");
                    this.dialogVisible = true;
                    this.showButton = false;
                }
            },
            doReboot: function(){
                this.upTips = this.$t("upload_reboot");
                var cmdObj_1 = {
                    key: "RECORD_MESSAGE_WEB"
                };
                var cmdObj = {
                    key: "REBOOT_WEB"
                };

                $post("do_cmd_web", cmdObj_1).then(function(response){
                    $post("do_cmd_web", cmdObj).then(function(response){
                    })
                })		
            }
        }
    })
})