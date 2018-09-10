// pages/catalog/catalog.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    catalogData:[],
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      bookId:options.id
    })
    this.getData();
  },
  /**
   * 根据书的编号获取列表
   */
  getData(){
    this.setData({
      isLoading: true
    })
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      this.setData({
        catalogData:res.data,
        isLoading: false
      })
    }).catch(err => {
      this.setData({
        isLoading: false
      })
    })
  }
})