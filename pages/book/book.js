// pages/book/book.js
import {fetch} from "../../utils/util.js"
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
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        isLoading: false,
        titleIndex: res.data.article.index
      })
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
    fetch.get(`/titles/${this.data.bookId}`).then(res =>{
      this.setData({
        catalog:res.data
      })
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
    let num = this.data.titleIndex;
    if (this.data.titleIndex > 0){
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
    let num = this.data.titleIndex;
    if (this.data.titleIndex < this.data.catalog.length-1) {
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
})