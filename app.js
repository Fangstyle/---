//app.js
var util = require('utils/util.js');
App({
    onLaunch: function () {
        let self = this;
        console.log(111);
        //调用API从本地缓存中获取数据

        wx.getStorage({
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

    },
    login: function () {
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
                    }, function () {
                        wx.setStorage({
                            key: "3rd_session",
                            data: "imaging..."
                        });
                        wx.navigateTo({
                            url: '/pages/regist/regist?isLogin=' + '登陆'
                        });
                        console.log('suceess login complete');
                    });

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    },
    regist: function () {
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
                        wx.navigateTo({
                            url: '/pages/regist/regist?isLogin=' + '注册'
                        });
                        console.log('suceess regist complete');
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
                console.log("验证通过" + self.globalData.rd_session);
                wx.switchTab({
                  url: '/pages/doc/doc',
                  success: function(res){
                    // success
                      console.log('success');
                  },
                  fail: function(res) {
                    // fail
                      console.log('fail'+res);
                  },
                  complete: function(res) {
                    // complete
                  }
                })
            },
            fail: function () {
                //登录态过期
                login(); //重新登录
            }
        })
    },
    globalData: {
        userInfo: null,
        rd_session: ''
    }
});