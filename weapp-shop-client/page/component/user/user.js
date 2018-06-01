// page/component/new-pages/user/user.js
var app = getApp();
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    isLogin:app.globalData.isLogin
  },
  onLoad(){
     let self = this;
    // /**
    //  * 获取用户信息
    //  */
    // wx.getUserInfo({
    //   success: function(res){
    //     self.setData({
    //       thumb: res.userInfo.avatarUrl,
    //       nickname: res.userInfo.nickName,
    //     })
    //   }
    // }),

    /**
     * 发起请求获取订单列表信息
     */
    wx.request({
      url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
      success(res){
        self.setData({
          orders: res.data
        })
      }
    })
  },
  onShow(){
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  },

  onGotUserInfo: function (e) {
      console.log(e.detail.errMsg)
      app.globalData.userInfo = e.detail.userInfo;
      app.globalData.isLogin = true;
      this.setData({
          thumb: app.globalData.userInfo.avatarUrl,
          nickname: app.globalData.userInfo.nickName,
          isLogin: app.globalData.isLogin
      });  
    //   wx.login({
    //       success: function (res) {
    //           if (res.code) {
    //               //发起网络请求
    //               wx.request({
    //                   url: 'https://test.com/onLogin',
    //                   data: {
    //                       code: res.code
    //                   },
    //                   merhod: 'POST',
    //                   success: (res)=>{
    //                       app.globalData.openID = res.openid;
    //                       console.log(app.globalData.openID)
    //                   }
    //               })
    //           } else {
    //               console.log('登录失败！' + res.errMsg)
    //           }
    //       }
    //   });    
  }
})