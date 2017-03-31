//index.js
//获取应用实例
//var utils = require('../../utils/util.js');
var app = getApp();
Page({
    onLoad: function (options) {
        this.setData({
           isLogin:options.isLogin
        });
    },
    data: {
        countTime: "点击获取验证码",
        btnDisable: true,
        userInfo: {},
    },
    //事件处理函数
    confirms: function () {
        //utils.httpPost(url,postparams,compelteSend);
        this.compelteSend();
    },
    compelteSend: function () {
        var self = this;
        this.setData({
            countTime: 5,
        });

        console.log('phoneNum is ' + self.data.phoneNum);
        var timer = setInterval(function () {
            if (self.data.countTime) {
                console.log("timing");
                let tempCount = self.data.countTime - 1;
                self.setData({
                    countTime: tempCount
                });
            } else {
                self.setData({
                    countTime: "点击获取验证码",
                    btnDisable: false
                });
                clearInterval(timer);
            }
        }, 1000)

    },
    bindPhoneNum: function (e) {
        let temp = true;
        (/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value)) ? temp = false : true;
        this.setData({
            phoneNum: e.detail.value,
            btnDisable: temp
        })
    },
    bindConfirmNum: function (e) {
        this.setData({
            confirmNum: e.detail.value
        })
    },

    regist: function () {
        //utils.httpPost(url,{'confirmNum':e.detail.value,self.confirmNum},toPages);
    },
    toPages: function (res) {
        wx.switchTab({
            url: '../doc/doc'
        })
    }
});
