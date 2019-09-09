import { config } from './config.js'
//app.js
App({
  globalData: {
    userInfo: null,
    openId: '12312312'
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        let loginCode = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: config.api_base_url + '/base/getToken',
          method: 'GET',
          data: {code:res.code},
          header: {
            'content-type': 'application/json',
            'appkey': config.appkey
          },
          success: (res) => {
            // startsWith
            // endsWith
            let code = res.statusCode.toString()
            if (code.startsWith('2')) {
              // console.log(res)
              this.globalData.openId = res.data.msg.openid;
              // 获取用户信息
              wx.getSetting({
                success: res => {
                  if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.userInfo = res.userInfo
                        console.log(this.globalData.userInfo);
                        console.log(this.globalData.openId);
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        let userInfo = JSON.stringify(res.userInfo);
                        
                        if (res.userInfo) {
                          wx.request({
                            url: config.api_base_url + '/base/checkToken',
                            method: 'POST',
                            data: { code:loginCode,openid: (this.globalData.openId),userInfo:userInfo},
                            header: {
                              'content-type': 'application/json',
                              'appkey': config.appkey
                            },
                            success: (res) => {
                                
                            },
                            fail:{

                            }
                          })
                        }
                      }
                    })
                  }
                }
              })
            } else {
              wx.showToast({
                title: '初始化失败',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: (err) => {
            wx.showToast({
              title: '初始化接口错误',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
    
  }
})