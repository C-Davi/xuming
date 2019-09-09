import { MovieModel } from '../../models/movie.js'
import { LikeModel } from '../../models/like.js'

let movieModel = new MovieModel()
Page({
  data: {
    classicData:null,
    list:[],
    index:0,
    total:0,
    first:false,
    latest:true
  },
  onLoad: function () {
    this._onLoad();
  },
  _onLoad:function() {
    this.getSomeMovies();
  },
  //获取电影
  getSomeMovies:function(){
    this.isShowLoading();
    movieModel.getSomeMovies((res)=>{
      this.setData({
        classicData:res.data[0],
        list:res.data,
        index:0,
      })
    })
    this.isHideLoading();
  },
  // 点赞
  onLike: function (event) {
    console.log(event);
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  },
  //上一页
  onLeft: function (event) {
    let index = this.data.index;
    if((index-1) ==0){
      this.setData({
        classicData:this.data.list[0],
        index:0,
        latest:true
      })
    }else{
        this.setData({
          classicData:this.data.list[index-1],
          index:index-1,
          latest:false
        })
    }
  },
  //下一页
  onRight: function (event) {
    let index = this.data.index;
    if(index+1 ==5){
      this.onLoad();
    }else{
      this.setData({
        classicData:this.data.list[index+1],
        index:index+1,
        latest: false
      })
    }
  },
  isShowLoading:function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
  },
  isHideLoading:function(){
    wx.hideToast();
  }
})