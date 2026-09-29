define(["vue", "vue-i18n", "/lang/"+g_device_data.userLang+"/sms_res.js"], function(Vue, VueI18n, lang){
    var messages = {}
    messages[g_device_data.userLang] = lang;
    var i18n = new VueI18n({
        locale: g_device_data.userLang,
        messages: messages
    });
    var view = '\
    <div>\
        <div class="page_title">\
            <div class="head_line">{{$t(\'sms_send\')}}</div>\
            <div class="title_tips" style="color:red" v-if="Airplane_on">{{$t(\'airplane_hint\')}}</div>\
            <div class="title_tips" style="color:red" v-if="SMSDisable">{{$t(\'smsdisable_hint\')}}</div>\
        </div>\
        <div class="page_content">\
        <el-form ref="formData" size="large" :model="formData" :rules="rules" :label-position="g_this.label_position" label-width="40%">\
            <el-form-item :label="$t(\'recv_number\')" prop="recv_number">\
                <el-input v-if="g_device_data.operator_name != \'COMMON\' && g_device_data.operator_name != \'COMMON_INTL\' && g_device_data.operator_name != \'SA_STC\' && g_device_data.operator_name != \'KEN_SARAFI\' && g_device_data.operator_name != \'PL_PLUS\' && g_device_data.operator_name != \'LEISHEN\'" v-model="formData.code_num" style="width: 80px"></el-input>\
                <span v-if="g_device_data.operator_name != \'COMMON\' && g_device_data.operator_name != \'COMMON_INTL\' && g_device_data.operator_name != \'SA_STC\' && g_device_data.operator_name != \'KEN_SARAFI\' && g_device_data.operator_name != \'PL_PLUS\' && g_device_data.operator_name != \'LEISHEN\'"> + </span>\
                <el-input v-model="formData.recv_number" style="width: 50%"></el-input>\
            </el-form-item>\
            <el-form-item :label="$t(\'Content\')" prop="Content">\
                <el-input type="textarea" id="tx" :rows="4" v-model="formData.Content" @keyup.enter.native="addrow" style="width: 41%"></el-input>\
            </el-form-item>\
            <el-form-item>\
                <el-button type="primary" @click="onApply" :disabled="Airplane_on || SMSDisable">{{$t("Send")}}</el-button>\
            </el-form-item>\
        </el-form>\
        <el-form size="large" :label-position="g_this.label_position" label-width="50%">\
            <el-button type="text" @click="multi_del" style="float:right">{{$t(\'multi_del\')}}</el-button>\
            <el-table ref="table" @select-all="handleCheckBox"\
                @row-dblclick="viewMessageForm"\
                :data="currentData"\
                cell-style="border-bottom:1px solid #e5e6ec;">\
                <el-table-column :label="$t(\'recv_number\')" prop="recv_number" align=\'center\'></el-table-column>\
                <el-table-column :label="$t(\'Subject\')" prop="Subject" align=\'center\'></el-table-column>\
                <el-table-column :label="$t(\'send_time\')" prop="send_time" align=\'center\'></el-table-column>\
                <el-table-column :label="$t(\'Operation\')" width="150px" align=\'center\'>\
                    <template slot-scope="scope">\
                        <el-button type="text" @click="viewMessageForm(scope.row)" size="mini" >{{$t(\'View\')}}</el-button>\
                        <el-button type="text" size="mini" @click="delAclData(scope.row)">{{$t(\'Delete\')}}</el-button>\
                    </template>\
                </el-table-column>\
                <el-table-column type="selection" prop="checked" align=\'center\'>\
                    <template slot-scope="scope">\
                        <el-checkbox v-model="scope.row.checked"></el-checkbox>\
                    </template>\
                </el-table-column>\
            </el-table>\
            <div style="text-align: center;margin-top: 30px;">\
              <el-pagination\
                background\
                :current-page.sync="currentPage"\
                @current-change="handleCurrentChange"\
                layout="prev, pager, next"\
                :pager-count="4"\
                :total="total">\
              </el-pagination>\
            </div>\
            <el-dialog :title="$t(\'messages\')"\
                :close-on-click-modal="false"\
                :visible.sync="dialogTable"\
                style="overflow-y:auto">\
                <el-form ref="formData1" :model="formData1" size="large" label-position="top">\
                    <el-form-item v-html="formData1.Content" style="white-space: pre-wrap" prop="Content">\
                    </el-form-item>\
                </el-form>\
            </el-dialog>\
        </el-form>\
        </div>\
    </div>'
    return Vue.extend({
        i18n: i18n,
        message: lang,
        template: view,
        data: function() {
            var that = this;
            return {
                SMSDisable: false,
                Airplane_on:false,
                dialogTable: false,
                pagesize: 10,
                total: 10,
                currentPage: 1,
                currentData:[],
                aclLists:[],
                formData:{
                    code_num: "",
                    Content: "",
                    recv_number: "",
                },
                formData1:{
                    Content: "",
                },
                rules:{
                    Content: [
                        {required: true, min: 1, max: 256, message: that.$t("content_hint"), trigger: "blur"}
                    ],
                    recv_number: [
                        {required: true,  min: 1, max: 64, message: that.$t("recv_number_hint"), trigger: "blur"},
                        {
                            validator: function(rule, value, callback) {
                                
                                for (var i=0; i<value.length; i++){
                                    if (isNaN(value[i])){
                                        callback(new Error(that.$t("recv_number_hint")));
                                        return
                                    }
                                }
                                callback();
                            },
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        computed: {},
        watch: {},
        created: function() {
            openLoading();
            this.getdata();
        },
        beforeDestroy:function () {
        },
        mounted: function() {},
        methods: {
            getdata: function(){
                var that = this;
                var getData = {
                    total_msg_num: x_SMS_send_total_obj,
                    AirplaneEnable : x_NetworkSettings_obj + x_NetworkSet_AirplaneEnable,
                    SMSDisable : x_NetworkSettings_obj + x_NetworkSet_SMSDisable,
                };

                $multipost("get_value_by_xmlnode|get_send_msg", getData, null).then(function(response){
                    //console.log(response);
                    if(g_device_data.operator_name == "COMMON" || g_device_data.operator_name == "COMMON_INTL" || g_device_data.operator_name == "SA_STC" || g_device_data.operator_name == "KEN_SARAFI" || g_device_data.operator_name == "PL_PLUS" || g_device_data.operator_name == "LEISHEN")
                    {
                        that.formData.code_num = "";
                    }
                    else if (g_device_data.operator_name == "OMN_OMANTEL")
                    {
                        that.formData.code_num = "968";
                    }
                    else
                    {
                        that.formData.code_num = "63";
                    }
                    that.total = 10*(Math.ceil(response.data_1.total_msg_num / that.pagesize));
                    that.Airplane_on = response.data_1.AirplaneEnable == "1" ? true : false;
                    that.SMSDisable = response.data_1.SMSDisable == "1" ? true : false;
                    var tmp = [];
                    for(e in response.data_2)
                    {
                        tmp.push(response.data_2[e.toString()]);
                    }
                    that.handleSMSTable(tmp);
                    that.currentData = that.aclLists.slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize);
                    if(that.currentPage != 1 && that.currentData.length == 0){
                        that.currentPage -= 1;
                        that.currentData = that.aclLists.slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize);
                    }
                    closeLoading();
                })
            },
            handleCurrentChange:function(currentPage){
                var that = this;
                that.currentPage = currentPage;
                that.currentData = that.aclLists.slice((that.currentPage-1)*that.pagesize,that.currentPage*that.pagesize);
            },
            handleSMSTable: function(response){
                var that = this;
                this.aclLists = [];

                response.forEach(function(e) {
                    that.aclLists.push({
                        key_index: e.key_index,
                        index: e.item_index,
                        recv_number: e.recv_number,
                        Content: e.msg_content.replace(/\n/g,"<br>"),
                        Subject: e.msg_content.substr(0,20),
                        send_time: e.send_time,
                        checked: false,
                    });
                });
            },
            delAclData: function(data){
                var that = this;
                fh_confirm(that.$t('Delete_hint')).then(function(){
                    var delObj =  {
                        url: x_SMS_send_msg_obj,
                        index: data.index
                    };
                    openLoading();
                    $post("del_xmlnode", delObj).then(function(response){
                        var post_data = {
                            file_name: data.key_index,
                            mode: "send"
                        };
                        $post("del_msg_file", post_data).then(function(response){
                            that.getdata();
                        })
                    })
                })
            },
            viewMessageForm: function(data){
                this.formData1.Content = data.Content;
                this.dialogTable = true;
            },
            handleCheckBox: function(rows){
                var that = this;
                var flag = rows.length == 0 ? false : true;
                that.currentData.forEach(function (e){
                    e.checked = flag;
                })
            },
            multi_del: function(){
                var that = this;
                fh_confirm(that.$t('multi_delete_hint')).then(function(){
                    var post_data = {
                        del_ids: "",
                        mode: "send"
                    };
                    that.aclLists.forEach(function (e){
                        if(e.checked){
                            post_data.del_ids += e.index + '_'
                        }
                    });
                    post_data.del_ids = post_data.del_ids.substr(0,post_data.del_ids.length - 1);
                    openLoading();
                    $post("multi_del", post_data).then(function(response){
                        that.getdata();
                    })
                })
            },
            onApply: function () {
                var that = this;
                if (that.Airplane_on || that.SMSDisable) {
                    return false;
                }
                this.$refs['formData'].validate(function (valid) {
                    if (valid) {
                        openLoading();
                        that.saveSubmit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveSubmit: function(){
                openLoading();
                var that = this;

                //传到后台发短信
                var post_data = {
                    recv_number: "",
                    encode_schema: "",
                    content: ""
                };
                post_data.recv_number = that.formData.code_num + that.formData.recv_number;
                post_data.recv_number = post_data.recv_number.replace(/\s*/g,"");
                post_data.encode_schema = "GSM_8BIT";
                for(var i = 0; i < that.formData.Content.length; i++)
                {
                    if(that.formData.Content.charCodeAt(i) >= 1000)
                    {
                        post_data.encode_schema = "GSM_UCS2";
                    }
                    else
                    {
                        continue;
                    }
                }

                that.formData.Content = that.formData.Content.replace(/\\/g,'\\\\');
                that.formData.Content = that.formData.Content.replace(/\"/g,'\\\"');
                post_data.content = that.formData.Content.replace(/\$#/g,'\\\$#');
                if(post_data.content[-1] == "\\")
                {
                    post_data.content = post_data.content + '\\';
                }

                $post("send_msg", post_data).then(function(response){
                    //console.log(response);
                    if(response.result == 0 || response.result == "")
                    {
                        that.formData.recv_number = "";
                        that.formData.Content = "";
                        alert(that.$t('send_succeed'));
                    }
                    else
                    {
                        alert(that.$t('send_failed'));
                    }
                    that.getdata();
                })
            },
            addrow: function(){
                var that = this;
                var tx = document.getElementById("tx");
                var start = tx.selectionStart;
                var end = tx.selectionEnd;
                that.formData.Content = that.formData.Content.slice(0,start) + "\n" + that.formData.Content.slice(end);
                if(tx.setSelectionRange)
                {
                    setTimeout(function(){
                        tx.setSelectionRange(start+1,start+1);
                        tx.focus();
                    },0);
                }
                else if (tx.createTextRange) {
                    var range = tx.createTextRange();
                    range.move('character', start+1);
                    range.select();
                }
            }
        }
    })
})