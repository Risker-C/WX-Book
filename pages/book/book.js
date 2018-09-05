// pages/book/book.js
import {fetch} from "../../utils/util.js"
//使用towxml解析md
// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId:"",
    bookId:"",
    article:{},
    title:"",
    isShow:false,
    catalog:[],
    isLoading: false,
    fontSize:40,
    titleIndex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 
    this.setData({
      titleId:options.id,
      bookId:options.bookId
    })
    this.getData();
    this.getCatalog();
  },
  /**
   * 获取某一标题对应的文章内容
   */
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      // console.log(res)
      //使用towxml解析md
      // let data = app.towxml.toJson(res.data.article.content,'markdown')

      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        isLoading: false,
        titleIndex: res.data.article.index
      })
      // console.log(this.data.titleIndex)
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  },
  /**
   * 获取目录列表
   */
  getCatalog(){
    // console.log(this.data.bookId)
    fetch.get(`/titles/${this.data.bookId}`).then(res =>{
      // console.log(res);
      this.setData({
        catalog:res.data
      })
      // console.log(this.data.catalog);
    })
  },
  /**
   * 处理列表项是否显示
   */
  toggleCatalog(){
    this.setData({
      isShow: !this.data.isShow
    })
  },
  /**
   * 根据列表项选择请求文章内容，并关闭列表项
   */
  handleGet(event){
    // console.log(event);
    const id = event.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.getData();
    this.toggleCatalog();
  },
  /**
   * 调节字体大小，变大
   */
  toggleSizeUp(){
    if (this.data.fontSize > 60) {
      wx.showToast({
        title: '不能再大了',
      })
    } else {
      this.setData({
        fontSize : this.data.fontSize + 2
      })
    }
  },
  /**
   * 调节字体大小，变小
   */
  toggleSizeDown(){
    if (this.data.fontSize < 20){
      wx.showToast({
        title: '不能再小了',
      })
    }else{
      this.setData({
        fontSize : this.data.fontSize - 2
      })
    }
  },
  /**
   * 打开上一章内容
   */
  back(){
    // console.log(this.data.titleIndex);
    let num = this.data.titleIndex;
    if (this.data.titleIndex > 0){
      // console.log(this.data.catalog[num]._id)
      this.setData({
        titleId: this.data.catalog[num-1]._id
      })
      this.getData();
    }else{
      wx.showToast({
        title: '已是首章！'
      })
    }
  },
  /**
   * 打开下一章内容
   */
  next(){
    // console.log(event);
    let num = this.data.titleIndex;
    if (this.data.titleIndex < this.data.catalog.length-1) {
      // console.log(this.data.catalog[num]._id)
      this.setData({
        titleId: this.data.catalog[num + 1]._id
      })
      this.getData();
    } else {
      wx.showToast({
        title: '已是末章！'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})