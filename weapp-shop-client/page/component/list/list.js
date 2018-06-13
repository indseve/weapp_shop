// page/component/list/list.js
import { config } from '../../../data/config.js';
Page({
  data:{
      list:[],
      header:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      var self = this;
      wx.request({
          url: `http://${config.serverip}:${config.port}/promotion?name=${options.name}`, //仅为示例，并非真实的接口地址
          success: function (res) {
              let header = `http://${config.serverip}:${config.port}/${res.data.header}`
              self.setData({
                  list: res.data.list,
                  header
              })
          }
      });

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})