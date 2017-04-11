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
        userInfo: {},
        phoneNum:'',
        pnoneCode:'',
        passwords:'',
        passwordConfirm:'',
        btnToPages:true
    },
    //事件处理函数
    confirms: function () {
        let self = this;
        self.compelteSend();
        console.log(self.data.phoneNum);
        auth.sendPhoneCode(self.data.phoneNum,function (res) {
            console.log('发送成功');
        })

    },
    compelteSend: function () {
        let self = this;
        this.setData({
            countTime: 5,
            btnDisable: true
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
    bindPassword:function (e) {
        this.setData({
            passwords: e.detail.value,
        })
    },
    bindPasswordConfirm:function (e) {
        if(this.data.passwords == e.detail.value){
            this.setData({
                btnToPages:false
            })
        }
        this.setData({
            passwordConfirm: e.detail.value,
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
    bindPhoneCodeNum: function (e) {
        let temp = true;
        if(e.detail.value){
            this.setData({
                pnoneCode: e.detail.value,
                btnToPages:false
            })
        }

    },
    /*data格式{'mobile':1333333333,'code','4312','psd':123}*/
    regist: function () {
        let self = this;
        let data = {
            'mobile':self.data.phoneNum,
            'code':self.data.pnoneCode,
            'psd':self.data.passwordConfirm
        }
        auth.resgist(data,function (res) {
            console.log(res);
            self.toPages();
        },function (err) {

        });
        //utils.httpPost(url,{'confirmNum':e.detail.value,self.confirmNum},toPages);
       // app.regist(self.toPages);
    },
    toPages: function () {
        app.globalData.alreadyLogin=1;
        wx.switchTab({
            url: '../doc/doc'
        });
    }
});
