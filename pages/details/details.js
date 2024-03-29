// pages/details/details.js
import {fetch} from "../../utils/util.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookId : "",
    bookData:{},
    isLoading: false,
    isLogin:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId : options.id,
      isLogin:wx.getStorageSync("isLogin")
    });
    this.getData();
  },
  /**
   * 根据书的编号获取书的详细信息
   */
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      if(!this.data.isLogin){
        res.isCollect = 0
      }
      console.log(res);
      this.setData({
        bookData:res,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  /**
   * 点击阅读，跳转到列表详情页面，并传递书籍编号
   */
  jumpCatalog(){
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${this.data.bookId}`
    })
  },
  /**
   * 收藏功能
   */
  collect(){
    fetch.post('/collection', {
      bookId: this.data.bookId
    }).then((res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      }
      let bookData = { ...this.data.bookData }
      bookData.isCollect = 1;
      this.setData({
        bookData: bookData
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isLogin: wx.getStorageSync("isLogin")
    });
    this.getData();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.bookData.data.title,
      path: `/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.data.img
    }
  }
})