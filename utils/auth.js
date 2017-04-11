var dataUtil = require('dataUtil.js');
var urlUtil = require('urlUtil.js');
var url = require('../config');
var storage = require('storage.js');

function pageInit(orgId, params, site, that) {
  checkAndlogin(orgId, params, site, that)
}

function checkAndlogin(orgId, params, site, that) {
    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
        console.log("session 未过期，并且在本生命周期一直有效")
        if(!getApp().userValid(orgId)) {
          wxalogin(orgId, site, params, that)
        }
      },
      fail: function(){
        wxalogin(orgId, site, params, that)
    }
    })
}

function wxalogin(orgId, site, params, that) {
  wx.login({
    success: function (res) {
      console.log(res.code)
      if(res.code) {
        doWxalogin(orgId
          , {}
          , {
            'orgId': orgId
            , 'site': site
            , 'code': res.code
          }
          , that
          , getUserInfo
          )
      } else {
      console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  })
}

function getUserInfo(token, userid, orgId, site) {
      wx.getUserInfo({
        success: function (res) {
          getApp().globalData.userInfo = res.userInfo
          wx.setStorageSync('userInfo', getApp().globalData.userInfo)
          updateUserInfo(orgId
          , site
          , token
          , getApp().globalData.userInfo
          )
        }
        , fail: function(res) {
          console.log(res)
        }
      })
}

function updateUserInfo(orgId, site, token, userInfo,  cb) {
    dataUtil.urlPost(
    urlUtil.getUrl("wxainfo"
      , orgId
      , {
        'orgId': orgId
        , 'site': site
        , 'token': token
      }
    )
    , {
      "avatarUrl": userInfo.avatarUrl
      , "nickName": userInfo.nickName
    }
    , function(data) {
      //TODO: callback.
    }
    )
}

function doWxalogin(orgId, params, data, that,cb) {
  dataUtil.urlPost(
    urlUtil.getUrl("wxalogin", orgId, params)
    , data
    , function(res) {
      console.log(res)
      if(res.status == 'SUCCESS') {
        getApp().setToken(that.data.orgId,res.token, res.data.id)
        typeof cb == "function" && cb(res.token, res.data.id, that.data.orgId, that.data.site)
      }
    }
  )
}
/*data格式{'mobile':1333333333,'code','4312','psd':123}*/
function resgist(data,fun,err) {
    dataUtil.urlPost(url.registUrl,{"mobile":data.mobile,"code":data.code,"p":data.psd,"p2":data.psd},
        function (res) {
        if(res.status=='SUCCESS'){
            if(typeof fun == 'function'){
                storage.storageOne('alreadyLogin',1);
                storage.storageOne('token',res.token);
                fun(res);
            }
        }else if(res.status=='FAIL'){
            console.log(res.description);
            if(typeof err== 'function'){
                err();
            }
        }
    },function (err) {
        console.log(err);
    })
}

/*data格式{'mobile':1333333333,'psd':123}*/
function login(data,fun,err) {
    dataUtil.urlPost(url.loginUrl,{"mobile":data.mobile,"p":data.psd},
        function (res) {
            if(res.status=='SUCCESS'){
                if(typeof fun == 'function'){
/*                    let array = [{'key':'alreadyLogin','data':1},{'key':'token','data':res.token}]
                    /!*wx.setStorage({
                        key: "alreadyLogin",
                        data:1
                    });*!/
                    storage.storageArray(array);*/
                    storage.storageOne('alreadyLogin',1);
                    storage.storageOne('token',res.token);

                    fun(res);
                }
            }else if(res.status=='FAIL'){
                console.log(res.description);
                if(typeof err== 'function'){
                    err();
                }
            }
        },function (err) {
            console.log(err);
        })
}
/*{
 "status": "SUCCESS",
 "description": "短信发送成功"
 }
 */
function sendPhoneCode(phoneNum,fun,err) {
    dataUtil.urlPost(url.phoneNumUrl,{"mobile":phoneNum},function (res) {
        if(res.status=='SUCCESS'&&typeof fun == 'function'){
            fun(res);
        }

    },function (errs) {
        if(typeof err == 'function'){
            fun(errs);
        }
    })
}
module.exports = {
  wxalogin: wxalogin
  , pageInit: pageInit
    ,login:login,
    resgist:resgist,
    sendPhoneCode:sendPhoneCode
}
