//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    if(this.globalData['3rd_session']){
        //this.checkState();
        wx.navigateTo({
            url: 'pages/doc/doc'
        })

    }else{
        //this.login();
        wx.navigateTo({
            url: 'pages/login/login'
        });
    }
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail :function(){
              that.globalData.userInfo[motto]='/images/square.small.png';
              that.globalData.userInfo[nickName]='Palmdive';
            }
          })
        }
      })
    }
  },
   login:function () {
       //调用登录接口
       var self = this;
       wx.login({
           success: function(res) {
               if (res.code) {
                   //发起网络请求
                   wx.request({
                       url: 'https://test.com/onLogin',
                       data: {
                           code: res.code
                       },
                       success: function(response) {
                           wx.setStorage({
                               key:"3rd_session",
                               data:response.vaule
                           })
                       }
                   });

               } else {
                   console.log('获取用户登录态失败！' + res.errMsg)
               }
           }
       })
   },
    checkState:function () {
        wx.checkSession({
            success: function(){
                //session 未过期，并且在本生命周期一直有效 跳转首页

            },
            fail: function(){
                //登录态过期
                login(); //重新登录
            }
        })
    },
  globalData:{
    userInfo:null,
    "3rd_session":null
  }
})