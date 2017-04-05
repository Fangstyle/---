function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function  httpGet(url,callback,completeCallback) {
    wx.request({
        url: url, //仅为示例，并非真实的接口地址
        header: {
            'content-type': ' '/**/
        },
        success: function(res) {
            callback(res);
        },
        fail: function(){

        },
        complete:function() {
            completeCallback();
        }
    })
}
function httpPost(url,postparams,callback,completeCallback) {
    wx.request({
        url: url, //仅为示例，并非真实的接口地址
        data: postparams,
        header: {
            'content-type': ' '/**/
        },
        success: function(res) {
            callback(res);
        },
        fail: function(){

        },
        complete:function() {
            completeCallback();
        }
    })
}
module.exports = {
  formatTime: formatTime,
  httpGet:httpGet,
  httpPost:httpPost
}
