//index.js
//获取应用实例
//var utils = require('../../utils/util.js');
const app = getApp();
const storage = require('../../utils/storage');
const auth = require('../../utils/auth');
Page({
    onLoad: function (options) {

    },
    data: {
        countTime: "点击获取验证码",
        btnDisable: true,
        phoneNum: '',
        passWord: ''
    },
    changCount: function () {
        let self = this;
        let data = {
            'mobile':self.data.phoneNum ,
            'psd': self.data.passWord
        };
        auth.login(data,function () {
            console.log('登陆成功');
            self.toPages();
        })
    },

    bindPassword: function (e) {
        this.setData({
            passWord: e.detail.value,
        })
    },
    bindPhoneNum: function (e) {
        let temp = true;
        (/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value)) ? temp = false : true;
        this.setData({
            phoneNum: e.detail.value,
            btnDisable: temp
        })
    },

    toPages: function () {
        let self = this;
        app.globalData.alreadyLogin = 1;
        wx.switchTab({
            url: '../doc/doc'
        });
    }
});
