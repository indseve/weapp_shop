import {commodity} from '../../data/commodity.js'
Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    newest: []
   },
  onLoad: function(){
      var self = this;
      wx.request({
          url: 'http://127.0.0.1:5757/newest', //仅为示例，并非真实的接口地址
          success: function (res) {
              console.log(res.data)
              self.setData({
                  newest:res.data
              })
          }
      })
  }
})