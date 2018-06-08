import { config } from '../../../data/config.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        myAddress: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        if (getApp().globalData.openID) {
            wx.request({
                url: `http://${config.serverip}:${config.port}/getAddress`,
                method: "POST",
                data: { openid: getApp().globalData.openID },
                success: res => {
                    let myAddress = res.data;
                    this.setData({ myAddress })
                }
            })
        }
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    refresh() {
        if (getApp().globalData.openID) {
            wx.request({
                url: `http://${config.serverip}:${config.port}/getAddress`,
                method: "POST",
                data: { openid: getApp().globalData.openID },
                success: res => {
                    let myAddress = res.data;
                    this.setData({ myAddress })
                }
            })
        }
    },
    addressAdd: (e) => {
        wx.navigateTo({
            url: '../address/address',
        })
    },
    modifyAddress: (e) => {
        let str = JSON.stringify(e.currentTarget.dataset.info);
        wx.navigateTo({
            url: '../address/address?info=' + str
        })
    },
    delAddress(e) {
        let self = this;
        wx.showModal({
            title: '提示',
            content: '删除信息不可恢复，你确定要删除么',
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: `http://${config.serverip}:${config.port}/addressDel`,
                        method: 'POST',
                        data: {
                            no: e.currentTarget.dataset.no
                        },
                        success(res) {
                            console.log(res.data)
                            if (res.data == 'ok') {
                                wx.showToast({
                                    title: '成功',
                                    icon: 'success',
                                    duration: 2000
                                });
                                self.refresh();

                            } else {
                                wx.showToast({
                                    title: `失败
                                           请重试`,
                                    icon: 'none',
                                    duration: 2000
                                });
                            }
                        },
                        fail(res) {
                            wx.showToast({
                                title: `失败
                                       请重试`,
                                icon: 'none',
                                duration: 2000
                            });
                            console.log('fail')
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    chooseAddress: (e)=>{
        getApp().globalData.chooseAdd = e.currentTarget.dataset.info;
        wx.navigateBack({
            url: '../orders/orders'
        })
    }
})