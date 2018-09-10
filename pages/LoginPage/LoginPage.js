// pages/LoginPage/LoginPage.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    console.log(e);
    let backtype = this.data.backType;
    if (e.detail.userInfo) {
      wx.setStorageSync("isLogin", true);
      wx.navigateBack({
        Number:1
      })
    } else {
      wx.showToast({
        title: '很遗憾，您拒绝了授权',
        icon:'none'
      });
    }
  },
  navigateBack(){
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})