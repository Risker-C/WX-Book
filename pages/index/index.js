//index.js
//获取应用实例
import { fetch, login, changeTime} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    maincontent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isLoading:false,
    pn:1,
    isAll:false,
    loadDone:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    login();
    this.getAllData();
  },
  //获取轮播图数据
  getData(){
    return new Promise((resole,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/swiper').then(res => {
        resole();
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      }).catch(err => {
        reject(err);
        this.setData({
          isLoading: false
        })
      })
    })
  },
  //获取所有图书
  getContent(){
    return new Promise((resole, reject) => {
      fetch.get('/category/books', { pn: this.data.pn }).then(res=>{
        resole();
        res.data = this.change(res.data);
        let arr = [...this.data.maincontent,...res.data]
        this.setData({
          maincontent: arr
        })
        if(res.data.length<2){
          this.setData({
            isAll:true
          })
        }
      })
    })
  },
  // 获取全部数据
  getAllData(){
    return new Promise((resolve,reject)=>{
      Promise.all([this.getData(),this.getContent()]).then(()=>{
        resolve();
        this.setData({
          loadDone:true
        })
      }).catch( err => {
        reject(err);
      })
    })
  },
  //实现点击跳转
  jumpbook(event){
    // console.log(event)
    const id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  //实现下拉刷新内容
  onPullDownRefresh(){
    this.setData({
      pn:1,
      maincontent: [],
      isAll:false
    })
    this.getAllData().then(()=>{
      wx.stopPullDownRefresh();
    }).catch(err=>{
      console.log(err);
    });
  },
  //实现上拉加载更多
  onReachBottom(){
    if(!this.data.isAll){
      this.setData({
        pn: this.data.pn + 1
      })
      this.getContent();
    }
  },
  //获取某类型书籍列表
  getListBook(event){
    console.log(event.currentTarget.dataset.id);
    let listName = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/categoryList/categoryList?listName=${listName}`,
    })
    
  },
  //更改时间格式
  change(arr){
    arr.forEach((item) => {
      item.books.forEach((item)=>{
        item.updateTime = changeTime(item.updateTime)
      })
    })
    return arr;
  }
})
