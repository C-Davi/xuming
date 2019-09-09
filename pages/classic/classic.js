// pages/classic/classic.js

import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    latest: false,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      console.log(res.data.type)
      // 数据更新
      wx.showToast({
        title: '加载中',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        classicData: res.data
      })
      wx.hideToast();
    })
  },

  /**
   * 点赞
   */
  onLike: function (event) {
    
    let behavior = event.detail.behavior
    console.log(behavior);
    console.log(this.data.classicData.id);
    console.log(this.data.classicData.type);
    // return;
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type,(res)=>{
      console.log(res)
    })
  },

  /**
   * 上一页
   */
  onLeft: function (event) {
    wx.showToast({
      title: '加载中',
      icon: 'none',
      duration: 2000
    })
    let index = this.data.classicData.index;
    classicModel.getPrevious(index, (res) => {
      this.setData({
        classicData: res.data
      })
    })
    wx.hideToast();
  },

  /**
   * 下一页
   */
  onRight: function (event) {
    wx.showToast({
      title: '加载中',
      icon: 'none',
      duration: 2000
    })
    let index = this.data.classicData.index;
    classicModel.getNext(index, (res) => {
      wx.showToast({
        title: '加载中',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        classicData: res.data
      })
      wx.hideToast();
    })
  },

  /**
   * 开始录音
   */
  action: function(event) {
      const options = {
        duration: 10000,//录制时间，ms
        sampleRate:16000,//采样率
        numberOfChannels:1,//录音通道数
        encodeBitRate:96000,//编码码率
        format:'mp3',//音频格式，有效值acc、mp3
        frameSize:50,//指定帧大小,单位kb
      }
      recorderManager.start(options);
      recorderManager.onStart(() => {
        console.log('recorder start')
      });
      recorderManager.onError((res) => {
        console.log(res)
      });
  },

  /**
   * 结束录音
   */
  stop: function(event) {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音',res.tempFilePath);
      const { tempFilePath } = res
    });
  },

  /**
   * 获取微信运动步数
   */
  getrun: function(event) {
    wx.getWeRunData({
      success:function (res) {
        const encryptedData = res.encryptedData;
        console.log(res);
      },
      fail: function (res){
        wx.showModal({
          title: '提示',
          content: '未开通微信运动步数，请关注“微信运动”公众号后重试',
          showCancel:false,
          confirmText: '知道了'
        })
      }
    })
  },

  /**
   * 用户授权
   */
  getUserInfo: function(event) {
    if(event){
      console.log(event.detail.userInfo);
    }
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