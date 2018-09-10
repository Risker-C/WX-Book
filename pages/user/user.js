// pages/user/user.js
import { fetch, login} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectNum:"0",
    isLogin:false,
    nickName:"未登录",
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser();
    
  },
  getUser(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.setData({
            isLogin: wx.getStorageSync("isLogin")
          }),
          login();
          wx.getUserInfo({
            success: res => {
              this.setData({
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              })
              if (this.data.isLogin) {
                this.allCollections();
              }
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: err => {
              console.log(err);
            }
          })
        } else {
          wx.setStorageSync("isLogin", false)
          wx.showToast({
            title: '未登录状态，不能记录阅读记录！',
            icon:'none',
            duration:2000
          })
        }
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  /**
   * 获取收藏总数
   */
  allCollections(){
    return new Promise((resolve,reject)=>{
      fetch.get("/collection/total", {
      }).then(res => {
        this.setData({
          collectNum: res.data
        })
        resolve();
      }).catch(err => {
        reject(err);
      })
    })
  },
  /**
   * 跳转页面
   */
  jumpPage(){
    wx.navigateTo({
      url: '/pages/collectList/collectList',
    })
  },
  login(){
    wx.navigateTo({
      url: '/pages/LoginPage/LoginPage',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.isLogin){
      this.allCollections();
    }else{
      this.getUser();
    }
  },
  doNot(){
    wx.showToast({
      title: '功能尚未开发，敬请期待',
      icon:'none'
    })
  }
})