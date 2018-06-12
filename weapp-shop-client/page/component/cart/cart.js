// page/component/new-pages/cart/cart.js
import { config } from '../../../data/config.js'
Page({
    data: {
        carts: [],               // 购物车列表
        hasList: false,          // 列表是否有数据
        totalPrice: 0,           // 总价，初始为0
        selectAllStatus: false,    // 全选状态，默认全选
        isEdit: false,
        edit: '编辑'
        // obj:{
        //     name:"hello"
        // }
    },
    onShow() {
        wx.request({
            url: `http://${config.serverip}:${config.port}/getCart`,
            data: {
                openid: getApp().globalData.openID
            },
            method: 'POST',
            success: res => {
                if (res.data) {
                    this.setData({
                        hasList: true,
                        carts: res.data
                    })
                }
                console.log(this.data)
            }
        })
        this.setData({
            selectselectAllStatus: false,    // 全选状态，默认不全选
            isEdit: false,
            edit: '编辑',
            totalPrice: 0
        })
    },
    //   onShow() {
    //     this.setData({
    //       hasList: true,
    //       carts:[
    //         {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01,selected:true},
    //         {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03,selected:true}
    //       ]
    //     });
    //     this.getTotalPrice();
    //   },
    /**
     * 当前商品选中事件
     */
    selectList(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        const selected = carts[index].selected;
        carts[index].selected = !selected;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 删除购物车当前商品
     */
    deleteList(e) {
        let self = this;
        wx.showModal({
            title: '提示',
            content: '你确定要删除',
            success: function (res) {
                if (res.confirm) {
                    const index = e.currentTarget.dataset.index;
                    let carts = self.data.carts;
                    wx.request({
                        url: `http://${config.serverip}:${config.port}/delCart`,
                        data: {
                            openid: getApp().globalData.openID,
                            pid: carts[index].pid
                        },
                        method: 'POST',
                        success(res) {
                            if (res.data == 'ok') {
                                carts.splice(index, 1);
                                self.setData({
                                    carts
                                });
                                if (!carts.length) {
                                    self.setData({
                                        hasList: false
                                    });
                                } else {
                                    self.getTotalPrice();
                                }
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

    /**
     * 购物车全选事件
     */
    selectAll(e) {
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;

        for (let i = 0; i < carts.length; i++) {
            carts[i].selected = selectAllStatus;
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定加数量事件
     */
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = parseInt(carts[index].num);
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 绑定减数量事件
     */
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        const obj = e.currentTarget.dataset.obj;
        let carts = this.data.carts;
        let num = carts[index].num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 计算总价
     */
    getTotalPrice() {
        let carts = this.data.carts;                  // 获取购物车列表
        let total = 0;
        for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
            if (carts[i].selected) {                     // 判断选中才会计算价格
                total += carts[i].num * carts[i].price;   // 所有价格加起来
            }
        }
        this.setData({                                // 最后赋值到data中渲染到页面
            carts,
            totalPrice: total.toFixed(2)
        });
    },
    editCart(e) {
        let isEdit = !this.data.isEdit;
        let edit;
        if (isEdit) {
            edit = '完成';
        } else {
            edit = '编辑';            
            let carts = [];
            this.data.carts.map(item =>{return carts.push({pid: item.pid,num: item.num})});
            // carts.forEach(item=>{
            //     delete item.productname;
            //     delete item.image;
            //     delete item.price;
            // })
            console.log(carts)
            wx.request({
                url: `http://${config.serverip}:${config.port}/modifyCart`,
                data:{
                    carts:carts,
                    openid:getApp().globalData.openID
                },
                method:"POST"
            });
        }
        this.setData({
            isEdit,
            edit
        });        
    },

    toPay() {
        getApp().globalData.goods = this.data.carts.filter((item) => {
            return item.selected == true;
        });
        console.log(getApp().globalData.goods);
        if (getApp().globalData.goods.length) {
            wx.navigateTo({
                url: `../orders/orders?fee=${this.data.totalPrice}`,
            })
        }
    }

})