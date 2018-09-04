//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    maincontent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isLoading:false
  },
  onLoad () {
    this.getData();
    this.getContent();
  },
  //获取轮播图数据
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get('/swiper').then(res =>{
      this.setData({
        swiperData:res.data,
        isLoading:false
      })
      // console.log(res)
    }).catch(err=>{
      this.setData({
        isLoading:false
      })
    })
  },
  //获取所有图书
  getContent(){
    fetch.get('/category/books').then(res=>{
      // console.log(res)
      this.setData({
        maincontent:res.data
      })
      // console.log(this.data.maincontent)
    })
  },
  //实现点击跳转
  jumpbook(event){
    const id = event.currentTarget.dataset.id;
    // console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  }
})
