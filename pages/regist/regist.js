//index.js
//获取应用实例
//var utils = require('../../utils/util.js');
var app = getApp();
Page({
    data: {
        countTime: "点击获取验证码",
        userInfo: {}
    },
    //事件处理函数
    confirms: function () {
        //utils.httpPost(url,postparams,compelteSend);
        this.compelteSend();
    },
    onLoad: function () {

    },
    compelteSend: function () {
        var self = this;
        this.setData({
            countTime: 5
        });
        var timer = setInterval(function () {
            if (self.data.countTime) {
                console.log("timing");
                let tempCount = self.data.countTime - 1;
                self.setData({
                    countTime: tempCount
                });
            } else {
                self.setData({
                    countTime: "点击获取验证码"
                });
                clearInterval(timer);
            }
        }, 1000);
    }
});
