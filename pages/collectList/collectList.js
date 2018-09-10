// pages/collectList/collectList.js
import {fetch} from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList:[],
    isDelectDll:false,
    delectList:[],
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findCollection();
  },
  /**
   * 获取收藏列表
   */
  findCollection() {
    fetch.get("/collection", {
    }).then(res => {
      if (res.data.length > 0){
        this.data.show = false;
      }else{
        this.data.show = true;
      }
      this.setData({
        collectList:res.data,
        show:this.data.show
      })
    }).catch(err => {
      console.log(err);
    })
  },
  /**
   * 删除一个
   */
  delect(event){
    let id = event.currentTarget.dataset.id;
    let name = event.currentTarget.dataset.name;
    console.log(id)
    console.log(name)
    wx.showModal({
      title: '提示',
      content: '确认要取消这本书的收藏',
      success:(res)=>{
        if(res.confirm){
          fetch.delete(`/collection/${id}`, {
          }).then(res => {
            wx.showToast({
              title: res.msg,
            })
            this.findCollection();
            // if(this.data.collectList == 0){
            //   this.setData({
            //     show:true
            //   })
            // }
          }).catch(err => {
            console.log(err);
          })
        }else if(res.cancel){

        }
      }
    })
  },
  /**
   * 取消全部
   */
  clearAll(){
    if (this.data.isDelectDll){
      if (this.data.delectList.length > 0){
        wx.showModal({
          title: '提示',
          content: '确认要取消选中收藏？',
          success: res => {
            if (res.confirm) {
              fetch.post(`/collection/delete`, {
                arr: this.data.delectList
              }).then(res => {
                console.log(res);
                wx.showToast({
                  title: res.msg,
                })
                this.findCollection();
              }).catch(err => {
                console.log(err);
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    }
    this.setData({
      isDelectDll: !this.data.isDelectDll
    })
  },
  checkboxChange(e){
    console.log(e);
    this.setData({
      delectList: e.detail.value
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})