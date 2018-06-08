// page/component/orders/orders.js
import { config } from '../../../data/config.js'
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[
        {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01},
        {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03}
      ]
  },

 onLoad(options){
    this.setData({
        total:options.fee,
        orders:getApp().globalData.goods
    })
 },
 onShow(){
     if (getApp().globalData.chooseAdd){
         console.log(getApp().globalData.chooseAdd)
         this.setData({
             address: getApp().globalData.chooseAdd,
             hasAddress:true
         })
     }
 },


  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    let self = this;
    wx.showModal({
      title: '提示',
      content: '确定下单么',
      text:'center',
      success(){
          wx.request({
              url: `http://${config.serverip}:${config.port}/addBill`,
              data:{
                  goods: self.data.orders,
                  fee: self.data.total,
                  openid: getApp().globalData.openID,
                  no: getApp().globalData.chooseAdd.no
              },
              method:'POST'
          })
      }
    })
  }
})