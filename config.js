/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "http://cms.palmdrive.cn";

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    // 登录地址，用于建立会话
    loginUrl: `${host}/json/login`,
    //注册地址
    registUrl:`${host}/json/register`,
    phoneNumUrl:`${host}/json/mobilecode`
};

module.exports = config;
