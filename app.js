//app.js
var util = require('utils/util.js');
App({
    onLaunch: function () {
        let self = this;
        //调用API从本地缓存中获取数据
        self.storageTolocal('alreadyLogin');
/*        wx.getStorage({
            key: '3rd_session',
            success: function (res) {
                self.globalData.rd_session = res.data;
                console.log('++' + self.globalData.rd_session);
            },
            complete: function () {
                if (self.globalData.rd_session) {
                    self.checkState();
                    console.log("测试");
                    //下方写在checkState中，为了测试
                } else {
                    //第一次进行登录 打开注册页面
                    console.log("注册页面");
                    self.regist();
                }
            }
        });
        console.log('获取数据成功' + self.globalData.rd_session + "++");
        console.log(this.globalData.rd_session);
*/
    },
    storageTolocal:function (key,callback) {
        var self = this;
        wx.getStorage({
            key: key,
            success: function (res) {
                self.globalData[key] = res.data;
            },complete: function () {
                if(typeof callback == "function"){
                    callback();
                }
            }
        });
        console.log(self.globalData[key]);
    },
    login: function (callback) {
        //调用登录接口
        var self = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    util.httpPost('https://test.com/onLogin', {code: res.code}, function (res) {
                        /* wx.setStorage({
                         key:"3rd_session",
                         data:res.vaule
                         });
                         wx.navigateTo({
                         url: 'pages/regist/regist?isLogin='+'登陆'
                         });
                         console.log('suceess login');*/
                        if(typeof callback == "function"){
                            callback();
                        }
                    }, function () {
                        wx.setStorage({
                            key: "3rd_session",
                            data: "imaging..."
                        });
                        /*wx.redirectTo({
                            url: '/pages/login/login'
                        });*/
                        console.log('suceess login complete');
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    },
    regist: function (callback) {
        //调用登录接口
        var self = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    util.httpPost('https://test.com/onLogin', {code: res.code}, function (res) {
                        /*wx.setStorage({
                         key:"3rd_session",
                         data:res.vaule
                         });
                         wx.navigateTo({
                         url: '/pages/regist/regist?isLogin='+'注册'
                         });
                         console.log('suceess regist');*/

                    }, function () {
                        wx.setStorage({
                            key: "3rd_session",
                            data: "imaging..."
                        });
                        wx.setStorage({
                            key: "2rd_session",
                            data: "imaging2..."
                        });
                        self.globalData.user_name='321';
                       /* wx.redirectTo({
                            url: '/pages/regist/regist'
                        });*/
                       self.globalData.user_name='123';
                        console.log('suceess regist complete');
                        if(typeof callback == "function"){
                            callback();
                        }
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    },
    checkState: function () {
        let self = this;
        wx.checkSession({
            success: function () {
                //session 未过期，并且在本生命周期一直有效 跳转首页
                wx.setStorage({
                 key:"alreadyLogin",
                 data:1,
                 complete:function () {
                     self.storageTolocal('alreadyLogin',function () {
                         wx.switchTab({
                             url: '/pages/my/my'
                         })
                     });
                 }
                 });
                console.log('sucess');
            },
            fail: function () {
                //登录态过期
                //self.login(); //重新登录
                wx.navigateTo({
                    url: '/pages/login/login'
                });
                console.log("fails");
            }
        })
    },
    globalData: {
        user_name: null,
        user_phone:null,
        rd_session: '',
        alreadyLogin:0 //1表示已经登录中，2表示登陆过但已经logout 0表示新用户
    }
});