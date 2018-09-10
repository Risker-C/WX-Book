const baseURL = "https://m.yaojunrong.com"

const fetch = {
  http(url,method,data){
    return new Promise((resole,reject)=>{
      
      let token = wx.getStorageSync("token");
      let header = {
        "content-type": "application/json"
      };
      if(token){
        header.token = token;
      }
      wx.request({
        url: baseURL +url,
        data,
        method,
        header,
        success(res){
          // console.log(res.header.Token)
          if (res.header.token || res.header.Token){
            let getToken = res.header.Token ? res.header.Token : res.header.token;
            wx.setStorageSync("token", getToken)
          }
          resole(res.data);
        },
        fail(err){
          reject(err);
        }
      })
    })
  },
  get(url, data) {
    return this.http(url,'GET', data);
  },
  post(url,data){
    return this.http(url,'POST',data);
  },
  delete(url,data){
    return this.http(url,'DELETE',data);
  }
}

const login = () => {
    wx.login({
      success(res) {
        fetch.post('/login', {
          code: res.code,
          appid: 'wx8adb4ef3eceea0f9',
          secret: '34c7af97f057922d7760664ffce3caf4'
        }).then((res) => {
          console.log(res);
        })
      }
    })
}

const changeTime = (time) =>{
  let date = + new Date(time);
  let now = + new Date();
  let longTime = now - date;
  let str = "";
  if ((longTime / (1000 * 60)) < 60) {
    str = parseInt(longTime / (1000 * 60)) + "s"
  } else if ((longTime / (1000 * 60 * 60)) < 24) {
    str = parseInt(longTime / (1000 * 60 * 60)) + "小时";
  } else {
    str = parseInt(longTime / (1000 * 60 * 60 * 24)) + "天";
  }
  return(str)
}
exports.login = login;
exports.fetch = fetch;
exports.changeTime = changeTime;