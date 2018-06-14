
const Hogan = require('hogan.js');
let conf = {
    serverHost : ''
};
let _mm = {
    //网络请求
    request(param) {
        let _this = this;
        $.ajax({
            type :param.method || 'get',
            url :param.url || '',
            dataType :param.type || 'json',
            data :param.data || '',
            success:function (res) {
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if( 10 === res.status){
                    _this.doLogin();
                }else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error:function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    // 获取服务器地址
    getServerUrl (path){
        return conf.serverHost + path;
    },
    // 获取URL传值
    getUrlParam(name){
        let reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href)
    },
    // 回首页
    goHome : function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;