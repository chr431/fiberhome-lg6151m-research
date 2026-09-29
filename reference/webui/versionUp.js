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
            <div class="head_line">{{$t(\'versionUp.title\')}}</div>\
            <div class="title_tips">{{$t(\'versionUp.tip\')}}</div>\
        </div>\
        <div class="page_content page_content_min_height">\
            <div class="version_detect" v-if="backVersionShow"><el-button size="medium" @click="backDialogFlag=\'true\'; version=\'\'">{{$t("versionUp.previous")}}</el-button>\</div>\
            <el-form size="large" :label-position="g_this.label_position" class="version_box">\
                <div class="version_img"><img src="../static/image/image_upgrade.png"></div>\
                <div class="curversion_text">{{$t(\'versionUp.curversion\')}}{{softwareVersion}}&nbsp&nbsp&nbsp<span class="versionUp_again" @click="getVersionAgain">{{$t(\'versionUp.detect\')}}</span></div>\
            </el-form>\
            <div>\
                <div class="new_version_section" v-if="newVersionShow">\
                    <div class="versionUp_secTitle">{{$t(\'versionUp.get.newversion\')}}</div>\
                    <div class="new_version_box">\
                        <div class="version_info">\
                            <div class="version_text">{{newVersion}}</div>\
                            <div>\
                                <div>{{$t(\'versionUp.createTime\')}}{{createTime}}</div>\
                                <div class="versionUp_descriptions">{{$t(\'versionUp.descriptions\')}}<br/>{{descriptions}}</div>\
                            </div>\
                        </div>\
                        <div class="up_button">\
                            <div><el-button size="medium" type="primary" @click=onApply>{{$t("versionUp.upgrade")}}</el-button></div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
            <el-dialog \
                :title="$t(\'versionUp.previous\')" \
                :visible.sync="backDialogFlag" \
                :close-on-click-modal="false"\
                :close-on-press-escape="false"\
                class="versionDialog"\
                > \
                <div class="back_version_content">\
                    <div>{{$t(\'versionUp.curversion\')}}{{softwareVersion}}</div>\
                    <el-radio-group v-model="version" size="medium">\
                        <el-radio v-for="(item, index) in versionList" :key="index" :label="item" border>\
                            <div class="version_info">\
                                <div class="versionUp_SoftwareVer">{{item.backSoftwareVer}}</div>\
                                <div><span class="versionUp_lable">{{$t(\'versionUp.createTime\')}}</span><span class="versionUp_descriptions">{{item.backCreateTime}}</span></div>\
                                <div><span class="versionUp_lable">{{$t(\'versionUp.descriptions\')}}</span><br/><span class="versionUp_descriptions">{{item.backDescriptions}}</span></div>\
                            <div>\
                        </el-radio>\
                    </el-radio-group>\
                    <div class="dialog_tip">{{$t(\'versionUp.install.tip\')}}</div>\
                    <div slot="footer" class="version_dialog_button">\
                        <el-button @click="backDialogFlag = false">{{$t(\'versionUp.cancel\')}}</el-button>\
                        <el-button type="primary"  @click="upVersion(version)" :disabled="version == \'\'">{{$t(\'versionUp.install.start\')}}</el-button>\
                    </div>\
                <div>\
            </el-dialog>\
            <el-dialog \
                :title="$t(\'versionUp.result.title\')" \
                :visible.sync="tipShow" \
                :close-on-click-modal="false"\
                :close-on-press-escape="false"\
                :show-close="false" \
                > \
                <span>{{upTips}}</span>\
                <span slot="footer" class="dialog-footer">\
                    <el-button size="medium" v-if="showButton" type="primary" @click="tipShow = false">{{$t("upload_confirm")}}</el-button>\
                </span>\
            </el-dialog>\
            <el-dialog\
                :close-on-click-modal="false"\
                :close-on-press-escape="false"\
                :show-close="false"\
                :visible.sync="loadingShow"\
                style="overflow-y:auto;margin-top:25vh">\
                <div class="dialog_box">\
                    <div class="dialog_title">{{$t(\'versionUp.installing.title\')}}{{installVer}}</div>\
                    <div class="dialog_loading">\
                        <div class="grid-content">\
                            <div v-for="(item, index) in 40" :class="{\'grid-reset\': item % 2 !== 0 && item > nowNum/totalNum*40, \'grid-two\': item % 2 === 0, \'grid-item\': true}" :key="index"></div>\
                        </div>\
                    </div>\
                    <div class="dialog_tip">{{$t(\'versionUp.installing.tip\')}}</div>\
                </div>\
            </el-dialog>\
            <el-dialog\
                :visible.sync="dialogTip"\
                :close-on-click-modal="false"\
                :showClose="false"\
                :modal-append-to-body = "false"\
                >\
                <div class="dialog_content">\
                    <div class="dialog_content_main_left">\
                        <img src="/static/image/ic_dialog_warn.png"/>\
                        <span>{{$t(\'versionUp.install.version\')}}{{installVer}}</span>\
                    </div>\
                    <div :class="{\'dialog_content_tip\': true, \'dialog_content_tip_left\': true}">{{$t(\'versionUp.install.tip\')}}</div>\
                </div>\
                <div slot="footer">\
                    <el-button @click="dialogTip = false">{{$t(\'versionUp.cancel\')}}</el-button>\
                    <el-button type="primary" @click="installStart">{{$t(\'versionUp.install.start\')}}</el-button>\
                </div>\
            </el-dialog>\
        </div>\
    </div>'
    return Vue.extend({
        i18n: i18n,
        message: lang,
        template: view,
        data: function(){
            return {
                newVersionShow: false,
                backVersionShow: false,
                loadingShow: false,
                tipShow: false,
                showButton: false,
                softwareVersion:"",
                dialogTip: false,
                tipTitle: "",
                newVersion: "",
                createTime: "",
                descriptions: "",
                downloadUrl: "",
                installVer: "",
                currUrl: "",
                upTips: "",
                totalNum: 500,
                nowNum: 0,
                timeout: null, 
                interval: null,
                versionList: [],
                backDialogFlag: false,
                version: "",
            }
        },
        created: function(){
            openLoading();
            this.getdata();
            var that = this;
            that.nowNum = 0;
            that.interval = setInterval(function(){
                that.nowNum = that.nowNum + 50
                if (that.nowNum >= 500){
                    that.nowNum = 0;
                }
            }, 1000)
        },
        beforeDestroy:function () {
            clearTimeout(this.timeout);
            clearInterval(this.interval)
        },
        methods:{
            getdata: function(){
                var that = this;
                var getData = {
                    SoftwareVersion: x_DeviceInfo_obj + x_DeviceInfo_SoftwareVersion,
                };
                $post("get_value_by_xmlnode", getData).then(function (response){
                    that.softwareVersion = response.SoftwareVersion;
                    that.getNewVersion();
                })
            },
            getNewVersion: function(){
                var that = this;
                $post("version_detection",null,"check").then(function (data){
                   if(data.result == "SUCCESS"){
                        if (data.softwareVer){
                            that.newVersion = data.softwareVer;
                        }
                        if (data.url){
                            that.downloadUrl = data.url;
                        }
                        
                        if (data.createTime){
                            that.createTime = data.createTime;
                        }
                        if (data.descriptions){
                            that.descriptions = data.descriptions;
                        }
                        
                        if(that.newVersion !="" && (that.newVersion != that.softwareVersion)){
                            that.newVersionShow = true;
                        }else{
                            that.newVersionShow = false;
                        }
                        that.versionList = [];
                        if (data.back_info){
                            for (var i=0; i<data.back_info.length; i++){
                                that.versionList.push({
                                    backSoftwareVer: data.back_info[i].back_softwareVer,
                                    backUrl: data.back_info[i].back_url,
                                    backCreateTime: data.back_info[i].back_createTime,
                                    backDescriptions: data.back_info[i].back_descriptions,
                                })
                            }
                        }
                    }else{
                        that.newVersionShow = false;
                    }
                    if(g_device_data.operator_name == "COMMON"){
                        that.backVersionShow = that.versionList.length > 0 ? true:false;
                    }else{
                        that.backVersionShow = false;
                    }
                    
                    closeLoading();
                }).catch(function(data) {
                })
            },
            getVersionAgain: function(){
                openLoading(this.$t("versionUp.detecting"));
                this.getNewVersion();
            },
            upVersion: function(val){
                if (val == ""){
                    return false;
                }
                this.dialogTip = true;
                this.currUrl = val.backUrl;
                this.installVer = val.backSoftwareVer;
                this.backDialogFlag = false;
                this.installStart();
            },
            onApply: function(){
                this.dialogTip = true;
                this.currUrl = this.downloadUrl;
                this.installVer = this.newVersion;
            },
            installStart: function(){
                this.dialogTip = false;
                this.loadingShow = true,
                this.autoUpgrade(this.currUrl)
            },
            autoUpgrade: function(url){
                refreshTimeout()
                var that = this;
                var post_data = {
                    download_url : url,
                };
                $post("automatically_upgrade", post_data,"check", "1").then(function (response){
                    that.loadingShow = false,
                    that.tipShow = true;
                    if(response.automatic_upgrade == "SUCCESS"){
                        that.upTips = that.$t("upload_reboot");
                        var cmdObj_1 = {
                            key: "RECORD_MESSAGE_WEB"
                        };
                        var cmdObj = {
                            key: "REBOOT_WEB"
                        };

                        $post("do_cmd_web", cmdObj_1).then(function(response){
                            $post("do_cmd_web", cmdObj).then(function(response){
                                that.timeout = setTimeout(function(){
                                    jumpToLoginPage();
                                }, 10000);
                            })
                        })
                    }else{
                        that.upTips = that.$t("upload_failed");
                    }
                    that.showButton = true;
                })
            }
        }
    })
})