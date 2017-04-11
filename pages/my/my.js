var appInstance = getApp();
Page({
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        if (appInstance.globalData.alreadyLogin == 1) {
            this.setData({
                isLogin: true,
            });
        }
        ;
    },
    onReady: function () {
        // 页面渲染完成
        if (appInstance.globalData.alreadyLogin==1) {
            this.setData({
                isLogin: true,
            });
        }
        ;
    },
    onShow: function () {
        // 页面显示
        if (appInstance.globalData.alreadyLogin==1) {
            this.setData({
                isLogin: true,
            });
        }
        ;
    },
    data: {
        isShowingDialog: false
    },
    login: function () {
        if (appInstance.globalData.alreadyLogin == 0) {
            wx.navigateTo({
                url: '../regist/regist'
            });
        } else {
            wx.navigateTo({
                url: '../login/login'
            });
        }
    },
    popWindow: function () {
        var self = this;
        this.setData({
            isShowingDialog: !self.data.isShowingDialog,
        });
    },
    LogOut: function () {
        var self = this;
        wx.setStorage({
            key: "alreadyLogin",
            data: 2,
            success: function () {
                self.setData({
                    isLogin: false,
                    isShowingDialog: !self.data.isShowingDialog,
                });
            }
        });
    }
});