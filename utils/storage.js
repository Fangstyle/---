/**
 * Created by fangzhen on 2017/4/11.
 */
/*
* 将localstorage中的信息导入到app.gobaldata中
* */
function storageTolocal(context,key,callback) {
    let self = context;
    wx.getStorage({
        key: key,
        success: function (res) {
            self.globalData[key] = res.data;
        },complete: function () {
            if(typeof callback == "function"){
                callback();
            }
        }
    });
    console.log(self.globalData[key]);
}
function storageArray(data) {
    for(let i =0;i<data.length;i++){
        wx.setStorage({
            key:data[i].key,
            data:data[i].data
        });
    }

}
function storageOne(key,value) {
    wx.setStorage({
        key:key,
        data:value
    });
}
module.exports = {storageTolocal,storageArray,storageOne}
