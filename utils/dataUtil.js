var urlUtil = require('urlUtil.js')


function getOption(options, option) {
  if(option == 'i')
    return options['i'] || -1
  else if(option == 'si') 
    return options['si'] || -1
  else if(option == 'orgId') {
    var value = options['orgId'] 
    || getApp().getStorageSync('orgId')
    || getApp().globalData.orgId
    getApp().setStorage('orgId', value)
    return value
  } else if(option == 'site') {
    var value = options['site'] 
    || getApp().getStorageSync('site')
    || getApp().globalData.site
    getApp().setStorage('site', value)
    return value
  } else if(option == 'ancestor') 
    return options['ancestor'] || ''
  else if(option == 'back') 
    return options['back'] || ''
  else if(option == 'id') 
    return options['id'] || ''
  else
    return "undefined"
}



function errorMsg(res, confirm) {
  wx.showModal({
    title: '网络出错',
    content: res['errMsg'] + ' 请检查网络并重试.',
    success: function(res) {
      if (res.confirm) {
        console.log('用户点击确定')
        if(confirm)
          confirm()
      }
    }
  })
}

function urlPost(url, data, fn, error, complete) {
        wx.showNavigationBarLoading()
        wx.showToast({
          title: '加载中',
          icon: 'loading',
          duration: 10000
        })
        wx.request({
          url: url, 
          method: "POST",
          data: data,
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
              console.log('发送成功');
            console.log(res)
            wx.hideToast()
            fn(res.data)
          }, 
          complete: function(res) {
            console.log("complete")
            wx.hideNavigationBarLoading()

            if(complete)
              complete(res.data)
          }, 
          fail: function(res) {
            //TODO: Retry on fail.
            wx.hideToast()

            if(error)
              error(res.data)
            else
              errorMsg(res.data)               
          }
        })   
}

function urlGet(url, fn, error, complete) {
    wx.showNavigationBarLoading()
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
          url: url,
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            console.log("success")
             console.log('发送成功');
            wx.hideToast()

            fn(res.data)
          }, 
          complete: function(res) {
            console.log("complete: " + url)
            console.log(res)
            wx.hideNavigationBarLoading()

            if(complete)
              complete(res.data)
          },
          fail: function(res) {
            wx.hideToast()
            if(error)
              error(res)
            else
              errorMsg(res)  
          }
        })
}

function doApply(orgId, site, token, user, fn) {
  urlPost(urlUtil.jsonUser(orgId, site, token)
    , user
    , fn)
}

module.exports.getOption = getOption

module.exports.urlGet = urlGet
module.exports.urlPost = urlPost
