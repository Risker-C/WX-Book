// pages/history/history.js
import { fetch, changeTime} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:true,
    isAll:false,
    bookList:[],
    isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(wx.getStorageSync("isLogin"))
    this.setData({
      isLogin:wx.getStorageSync("isLogin")
    })
    this.getData();
  },
  getData(){
    return new Promise((resole,reject)=>{
      fetch.get("/readList", {
      }).then(res => {
        res.data.forEach((item) => {
          item.book.updateTime = changeTime(item.book.updateTime)
          item.Progreso = Math.ceil(item.title.index / item.title.total * 100)
        })
        this.setData({
          isLoading: false,
          isAll: true,
          bookList: res.data
        })
        resole();
      }).catch(err => {
        reject(err);
      })
    })
    
  },
  //实现点击跳转
  jumpbook(event) {
    let id = event.currentTarget.dataset.bookid;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //继续阅读
  continueRead(event){
    let data = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/book/book?id=${data.titleid}&bookId=${data.bookid}`,
    })
  },
  jump(){
    wx.switchTab({
      url: "/pages/user/user",
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isLogin:wx.getStorageSync("isLogin")
    });
    this.getData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData();
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  //实现上拉加载更多
  onReachBottom() {
    this.getData().then(res=>{
      wx.stopPullDownRefresh();
    }).catch(err=>{
      console.log(err);
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})