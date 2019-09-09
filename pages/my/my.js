
var app = getApp();
Page({
  data: {
    hasUserInfo:false,
    icon:'',
    city:'',
    country:'',
    gender:'',
    nickName:'',
    provience:''
  },
  onLoad: function () {
    let userInfo = app.globalData.userInfo;
    this.setData({
      icon: userInfo.avatarUrl,
      hasUserInfo:true
    })
  },
  //用户授权
  getUserInfo: function (event) {
    if (event) {
      let userinfo = event.detail.userInfo
      console.log(event.detail);
      this.setData({
        hasUserInfo:true,
        icon:userinfo.avatarUrl,
        nickName:userinfo.nickName
      })
    }
  },
})