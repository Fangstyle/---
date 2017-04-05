var app = getApp()
Page({
  data: {
    motto: '开启小程序之旅',
    userInfo: {}
  },
  //事件处理函数
  toAppPage: function() {
    wx.navigateTo({
      url: '../doc/doc'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    console.log(that.data.userInfo);
  }
})