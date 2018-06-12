#weapp_shop
此项目有三部分组成
小程序客户端 weapp-shop-client
web后台  vue-admin-demo 使用vue.js框架
后端  shopserver  使用express框架

数据库使用Mysql 直接导入weshang.sql即可

后台与后端分别需要安装依赖使用，千万别用cnpm安装依赖，诡异bug多

后端数据库配置文件在config.json中，按需修改即可。
使用npm start启动后端，监听端口为5757
之后可以启动小程序和管理后台
vue-cli dev环境使用本地9528端口
webpack相关配置在config文件夹下
后端相关配置在shop_config/shop_config.js中

小程序服务端配置在config.js文件中
由于没有appid，诸多功能受限，所有支付相关以及登陆相关功能并未实现。
在app.js中设置了固定的openid替代登录信息
微信web开发工具的模拟器有许多bug，忍受住。
