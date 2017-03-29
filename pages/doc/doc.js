//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  //doc在线预览
  loadDoc: function() {

  },
  //pdf在线预览
  loadPdf: function () {
    console.log("点击下载");
   wx.downloadFile({
  url: 'http://192.168.1.132:3000/img/bg/123.pdf',
  success: function (res) {
    console.log(res);
    var filePath = res.tempFilePath;
        console.log("下载成功"+filePath);

   /*   wx.saveFile({
      tempFilePath: filePath,
      success: function(res) {
        var savedFilePath = res.savedFilePath;
        console.log("存储成功："+savedFilePath);
      }
    })
    */

        wx.openDocument({
          filePath: filePath,
          success: function (res) {
          console.log('打开文档成功')
      },fail:function(err){
        for(var i in err ){
          console.log(err[i]);
        }
      }
    })
  }
})
  }
})
