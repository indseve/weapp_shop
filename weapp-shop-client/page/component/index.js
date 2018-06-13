import {config} from '../../data/config.js'
Page({
  data: {
      baseUrl: `http://${config.serverip}:${config.port}`,
    imgUrls: [],
    promotion:[],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    newest: []
   },
  onLoad: function(){
      var self = this;
      wx.request({
          url: `http://${config.serverip}:${config.port}/newest`, //仅为示例，并非真实的接口地址
          success: function (res) {
              self.setData({
                  newest:res.data
              })
          }
      })
      wx.request({
          url: `http://${config.serverip}:${config.port}/scroll`, //仅为示例，并非真实的接口地址
          success: function (res) {
              let data = res.data;
              let url = data.name.map(item => `http://${config.serverip}:${config.port}${data.baseUrl}/${item}`);
              console.log(url)
              self.setData({
                  imgUrls: url
              })
          }
      })
      wx.request({
          url: `http://${config.serverip}:${config.port}/cover`, //仅为示例，并非真实的接口地址
          success: function (res) {
              self.setData({
                  promotion: res.data
              })
          }
      })
  }
})