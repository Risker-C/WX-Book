// pages/categoryList/categoryList.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList:{},
    isLoading:true,
    isAll:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch.get(`/category/${options.listName}/books`, {
    }).then((res) => {
      this.setData({
        isLoading:false,
        isAll:true,
        bookList: res.data
      })
    }).catch((err) => {
      console.log(err);
    })
  } 
})