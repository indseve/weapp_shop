// page/component/details/details.js
import { config } from '../../../data/config.js';
Page({
    data: {
        goods: '',
        num: 1,
        totalNum: 0,
        hasCarts: false,
        curIndex: 0,
        show: false,
        scaleCart: false
    },

    onLoad: function (options) {
        let self = this;
        wx.request({
            url: `http://${config.serverip}:${config.port}/detail?pid=${options.pid}`,
            success: function (res) {
                console.log(res.data)
                self.setData({
                    goods: res.data[0]
                })
            }
        })
    },

    addCount() {
        let num = this.data.num;
        num++;
        this.setData({
            num: num
        })
    },

    addToCart() {
        let self = this;
        let num = this.data.num;
        let pid = this.data.goods.pid;
        let total = this.data.totalNum;
        wx.request({
            url: `http://${config.serverip}:${config.port}/addCart`,
            data: {
                openid: getApp().globalData.openID,
                pid:pid,
                num:num
            },
            method: 'POST',
            success(res) {
                if (res.data == 'ok') {
                    self.setData({
                        show: true
                    })
                    setTimeout(function () {
                        self.setData({
                            show: false,
                            scaleCart: true
                        })
                        setTimeout(function () {
                            self.setData({
                                scaleCart: false,
                                hasCarts: true,
                                totalNum: num + total
                            })
                        }, 200)
                    }, 300)
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
            }
        })



    },

    bindTap(e) {
        const index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index
        })
    }

})