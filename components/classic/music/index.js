// components/classic/music/index.js
var audioCxt;
var audioAnimation;
audioCxt = wx.createInnerAudioContext();
audioCxt.src = '';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      img: String,
      content: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@playing.png',
    playSrc: 'images/player@waitting.png',
    playMusic: 'playMusic',
    pauseMusic: 'pauseMusic',
    audioAnimation: null,
    //音乐是不是开始
    music_on: false,
    //音乐是不是在播放
    music_playing: false,
    //显示的时间
    musicTime: '00:00',
    sliderValue: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //播放按钮事件
    playMusic: function () {
      this.data.music_on = true;
      this.data.music_playing = true;
      audioCxt.play();
      console.log(this.data);
      wx.showToast({
        title: '加载中',
        icon: 'none',
        duration: 2000
      })
      //图片添加css样式，旋转样式
      this.setData({
        music_on: this.data.music_on,
        music_playing: this.data.music_playing,
      })
      wx.hideToast();
    },

    //暂停按钮事件
    pauseMusic: function () {
      this.data.music_on = false;
      this.data.music_playing = false;
      audioCxt.pause();
      console.log(this.data);
      
      this.setData({
        music_on: this.data.music_on,
        music_playing: this.data.music_playing
      })
    },

    //停止按钮事件
    stopMusic: function () {
      audioCxt.stop();
      this.data.music_on = false;
      this.setData({
        music_on: this.data.music_on
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //音乐播放结束触发
    audioCxt.onEnded((res) => {
      //修改属性。去除css状态
      this.data.music_on = false;
      wx.showToast({
        title: '加载中',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        music_on: this.data.music_on
      })
      
      //重新播放
      audioCxt.seek(0);
      this.setData({
        musicTime: '00:00',
        sliderValue: 0
      })
      wx.hideToast();
    })
  }
})
