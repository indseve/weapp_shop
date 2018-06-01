// page/component/new-pages/user/address/address.js
import{config} from '../../../data/config.js'
Page({
    data: {
        address: {
            name: '',
            tel: '',
            detail: '',
            no: ''
        },
        region: ['广东省', '广州市', '海珠区']
    },
    onLoad: function (option) {
        if (option.info) {
            let info = JSON.parse(option.info)
            this.setData({
                "address.name": info.name,
                "address.tel": info.tel,
                "address.detail": info.detail,
                region: [info.province, info.city, info.district],
                "address.no": info.no
            })
            console.log(info)
        }
    },

    formSubmit(e) {
        const value = e.detail.value;
        if (value.name && value.tel && value.detail) {
            if (this.data.address.no) {
                let self = this;
                wx.request({
                    url: `http://${config.serverip}:${config.port}/addressModify`,
                    data: {
                        name: e.detail.value.name,
                        tel: e.detail.value.tel,
                        detail: e.detail.value.detail,
                        no: self.data.address.no,
                        province: self.data.region[0],
                        city: self.data.region[1],
                        district: self.data.region[2]
                    },
                    method: 'POST',
                    success(res) {
                        console.log(res.data)
                        if (res.data == 'ok') {
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 20000
                            });
                            wx.navigateBack({
                                delta: 1
                            })
                        }else{
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
                console.log("ok")
            } else {
                let self = this;
                wx.request({
                    url: `http://${config.serverip}:${config.port}/addressAdd`,
                    data:{
                        name: e.detail.value.name,
                        tel: e.detail.value.tel,
                        detail: e.detail.value.detail,
                        province:self.data.region[0],
                        city: self.data.region[1],
                        district: self.data.region[2],
                        openid:getApp().globalData.openID                        
                    },
                    method:'POST',
                    success(res){
                        console.log(res.data)
                        if (res.data == 'ok') {
                            wx.showToast({
                                title: '成功',
                                icon: 'success',
                                duration: 20000
                            });
                            wx.navigateBack({
                                delta: 1
                            })
                        } else {
                            wx.showToast({
                                title: `失败
                                   请重试`,
                                icon: 'none',
                                duration: 2000
                            });
                        }
                    },
                    fail(res){
                        wx.showToast({
                            title: `失败
                                   请重试`,
                            icon: 'none',
                            duration: 2000
                        });
                        console.log('fail')
                    }
                })
            }
        } else {
            wx.showModal({
                title: '提示',
                content: '请填写完整资料',
                showCancel: false
            })
        }
    },
    bindRegionChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    }
})