define(["vue", "vue-i18n", "/lang/"+g_device_data.userLang+"/mobile_network_res.js"], function(Vue, VueI18n, lang){
    var messages = {};
    messages[g_device_data.userLang] = lang;
    var i18n = new VueI18n({
      locale: g_device_data.userLang,
      messages: messages
    })
    var view = '\
    <div>\
    <div class="page_title">\
        <div class="head_line">{{$t("mobile.atCommand.title")}}</div>\
    </div>\
    <div class="page_content">\
        <el-form size="large" ref="formData" :model="formData" :rules="checkData" :label-width="g_device_data.userLang == \'zh\' ? \'42%\' : \'45%\'" :label-position="g_this.label_position">\
            <el-form-item :label="$t(\'atCommand.command\')" prop = "command" class="is-required">\
                <el-input v-model="formData.command" type="text" maxlength="128"></el-input>\
                <el-button class="at_button" type="primary" size="small" @click="onApplay">{{$t(\'atCommand.submit\')}}</el-button>\
            </el-form-item>\
            <el-form-item>\
                <div class="mandatory">{{$t(\'mobile.network.mandatory\')}}</div>\
            </el-form-item>\
            <div class="textarea_box">\
                <div class="textarea_title"><p>{{$t(\'atCommand.response\')}}<p></div>\
                <el-input type="textarea" class="fh_textarea" rows="15" v-model="textarea" readonly="readonly"></el-input>\
            </div>\
        </el-form>\
    </div>\
    </div>'
    return Vue.extend({
        i18n: i18n,
        message: lang,
        template: view,
        data: function(){
            var that = this;
            return {
                formData:{
                    command: "",
                },
                textarea: " ",
                timeout: null,
                checkData:{
                    command: [
                        { required: true, message: that.$t("at.input.tip"),trigger: "blur"},
                        {
                            validator: function(rule,value,callback){
                                var changeValue = value.replace(/(^\s*)|(\s*$)/g, "");////删除左右两端的空格
                                if(isCnInclude(changeValue) || (changeValue.toUpperCase().substr(0,2) != "AT")){
                                    callback(new Error(that.$t("at.input.tip")));
                                }else{
                                    callback();
                                }
                            },
                            trigger:'blur'
                        }
                    ]
                },
            }
        },
        created: function(){
            // openLoading();
            // setTimeout(function(){
            //     closeLoading();
            // },200)
        },
        beforeDestroy:function () {
            clearTimeout(this.timeout)
        },
        methods:{
            onApplay: function(){
                var that = this;
                this.$refs['formData'].validate(function (valid) {
                    if (valid) {
                        openLoading();
                        that.onSubmit();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onSubmit: function(){
                var that = this;
                var setCommandObj = {
                    command: that.formData.command
                };
                $post("set_at_command", setCommandObj).then(function(response){
                    that.textarea = response.result;
                    that.timeout = setTimeout(function(){
                        closeLoading();
                    },500)
                });
            }
        }
    })
})