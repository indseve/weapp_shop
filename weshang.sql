# Host: 127.0.0.1  (Version 5.7.22-log)
# Date: 2018-06-11 17:59:23
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "bill_product"
#

DROP TABLE IF EXISTS `bill_product`;
CREATE TABLE `bill_product` (
  `billno` int(11) NOT NULL DEFAULT '0',
  `pid` int(11) unsigned NOT NULL DEFAULT '0',
  `number` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "bill_product"
#

INSERT INTO `bill_product` VALUES (1000000001,1001,21),(1000000001,1002,11),(1000000002,1002,11),(1000000003,1002,11),(1000000003,1001,21),(1000000003,1003,6),(1000000003,1004,6),(1000000004,1001,21),(1000000004,1002,11),(1000000004,1003,6),(1000000005,1001,21),(1000000005,1002,11),(1000000005,1003,6),(1000000006,1003,6),(1000000006,1001,21),(1000000006,1002,11),(1000000007,1003,6),(1000000007,1001,21),(1000000007,1002,11),(1000000008,1003,6),(1000000008,1001,21),(1000000008,1002,11),(1000000009,1003,6),(1000000009,1001,21),(1000000009,1002,11),(1000000009,1004,6),(1000000010,1004,6),(1000000010,1001,21),(1000000010,1002,11),(1000000010,1003,6),(1000000011,1003,6),(1000000011,1002,11),(1000000011,1001,21),(1000000011,1004,6),(1000000012,1004,6),(1000000012,1001,21),(1000000012,1002,11),(1000000012,1003,6),(1000000013,1004,6),(1000000013,1001,21),(1000000013,1002,11),(1000000013,1003,6),(1000000014,1004,6),(1000000014,1001,21),(1000000014,1002,11),(1000000014,1003,6),(1000000015,1004,6),(1000000015,1001,21),(1000000015,1002,11),(1000000015,1003,6),(1000000016,1004,6),(1000000016,1001,21),(1000000016,1002,11),(1000000016,1003,6),(1000000017,1004,6),(1000000017,1001,21),(1000000017,1002,11),(1000000017,1003,6),(1000000018,1004,6),(1000000018,1001,21),(1000000018,1002,11),(1000000018,1003,6),(1000000019,1004,6),(1000000019,1001,21),(1000000019,1002,11),(1000000019,1003,6),(1000000020,1001,21),(1000000020,1003,6),(1000000020,1002,11),(1000000020,1004,6),(1000000021,1004,6),(1000000021,1001,21),(1000000021,1002,11),(1000000021,1003,6),(1000000022,1004,6),(1000000022,1001,21),(1000000022,1002,11),(1000000022,1003,6),(1000000023,1001,21),(1000000023,1003,6),(1000000023,1002,11),(1000000023,1004,6);

#
# Structure for table "cart"
#

DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `openid` varchar(50) NOT NULL DEFAULT '',
  `pid` int(11) DEFAULT '0',
  `num` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "cart"
#

INSERT INTO `cart` VALUES ('110',1002,11),('110',1001,21),('110',1003,6),('110',1004,6),('110',1013,3),('110',1013,4),('110',1013,4),('110',1013,4),('110',1013,4);

#
# Structure for table "t_bill"
#

DROP TABLE IF EXISTS `t_bill`;
CREATE TABLE `t_bill` (
  `billno` int(11) NOT NULL DEFAULT '0',
  `createtime` datetime DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL,
  `fee` decimal(18,2) DEFAULT NULL,
  `openid` varchar(50) DEFAULT NULL,
  `nicknane` varchar(50) DEFAULT NULL,
  `ifsend` int(1) NOT NULL DEFAULT '2' COMMENT '0退货，1已发货，2未发货',
  `fkstatus` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '0未付款，1已付款',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '1正常，0已退单，2退单中',
  `address` int(11) DEFAULT NULL,
  PRIMARY KEY (`billno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "t_bill"
#

INSERT INTO `t_bill` VALUES (1000000001,'2018-05-31 17:01:59',NULL,0.43,'110',NULL,1,1,1,1),(1000000002,'2018-05-31 17:13:20',NULL,0.22,'110',NULL,2,1,1,2),(1000000003,'2018-05-31 17:14:59',NULL,0.85,'110',NULL,1,0,2,1),(1000000004,'2018-06-07 10:06:19',NULL,0.61,'110',NULL,1,1,1,1),(1000000005,'2018-06-07 10:06:51',NULL,0.61,'110',NULL,2,0,0,2),(1000000006,'2018-06-07 10:06:53',NULL,0.61,'110',NULL,2,0,1,2),(1000000007,'2018-06-07 10:06:54',NULL,0.61,'110',NULL,2,1,1,3),(1000000008,'2018-06-07 10:06:56',NULL,0.61,'110',NULL,2,0,1,6),(1000000009,'2018-06-07 10:07:42',NULL,0.85,'110',NULL,2,0,1,11),(1000000010,'2018-06-07 10:07:44',NULL,0.85,'110',NULL,2,0,0,2),(1000000011,'2018-06-07 10:07:45',NULL,0.85,'110',NULL,2,1,1,5),(1000000012,'2018-06-07 10:07:47',NULL,0.85,'110',NULL,2,0,1,6),(1000000013,'2018-06-07 10:07:48',NULL,0.85,'110',NULL,1,0,1,7),(1000000014,'2018-06-07 10:07:50',NULL,0.85,'110',NULL,2,1,1,8),(1000000015,'2018-06-07 10:07:51',NULL,0.85,'110',NULL,2,0,0,9),(1000000016,'2018-06-07 10:07:53',NULL,0.85,'110',NULL,0,0,1,10),(1000000017,'2018-06-07 10:07:54',NULL,0.85,'110',NULL,2,0,1,9),(1000000018,'2018-06-07 10:07:55',NULL,0.85,'110',NULL,0,1,1,4),(1000000019,'2018-06-07 10:07:57',NULL,0.85,'110',NULL,2,0,1,3),(1000000020,'2018-06-07 10:41:02',NULL,0.85,'110',NULL,2,1,2,5),(1000000021,'2018-06-07 10:41:04',NULL,0.85,'110',NULL,0,0,1,6),(1000000022,'2018-06-07 10:41:05',NULL,0.85,'110',NULL,1,0,1,8),(1000000023,'2018-06-08 10:11:19',NULL,0.85,'110',NULL,2,0,1,1);

#
# Structure for table "t_product"
#

DROP TABLE IF EXISTS `t_product`;
CREATE TABLE `t_product` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `productname` varchar(50) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `orig_price` decimal(18,2) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `cnt` int(11) DEFAULT NULL,
  `isuse` int(1) NOT NULL DEFAULT '0' COMMENT '0草稿，1发布，2删除',
  `type` int(1) DEFAULT '0',
  `status` varchar(2) DEFAULT NULL,
  `parameter` varchar(255) DEFAULT NULL,
  `service` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=1017 DEFAULT CHARSET=utf8;

#
# Data for table "t_product"
#

INSERT INTO `t_product` VALUES (1001,'瓜子',0.01,NULL,'77777嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻','2018-05-25 00:00:00',NULL,0,1,'有货','125g/个','不支持退换货','100g'),(1002,'莴笋',0.02,NULL,'哈哈哈哈哈哈哈哈哈哈哈哈哈','2018-02-16 00:00:00',NULL,1,0,'有货','250g/个','不支持退换货','200g'),(1003,'小米',0.03,NULL,'pppppppppppppp','2016-01-31 00:00:00',NULL,1,2,'有货','300g/个','不支持退换货','300g'),(1004,'新鲜芹菜',0.04,NULL,'离开对方嘎哈看别人反过来看等级划分能否','2018-05-02 00:00:00',NULL,1,3,'有货','100g/个','不支持退换货','201g'),(1005,'素米',0.05,NULL,'dsafsdafsadfdsafdsafsdafsdafdsfdsfa','2017-08-09 00:00:00',NULL,1,1,'有货','400/袋','不支持退换货','400g'),(1006,'西瓜',0.06,NULL,'的空间裂缝撒谎快乐回复撒','2017-08-09 00:00:00',NULL,1,0,'有货','360/个','不接受退换货','200g'),(1007,'北瓜',0.06,NULL,'的空间裂缝撒谎快乐回复撒','2019-02-05 00:00:00',NULL,1,0,'有货','360/个','不接受退换货','200g'),(1008,'南瓜',0.08,NULL,'4阿道夫飒飒的','0012-10-31 00:00:00',NULL,1,0,'有货','105/个','不支持退换货','1000g'),(1009,'中瓜',0.08,NULL,'4阿道夫飒飒的','2018-06-05 12:32:53',NULL,1,0,'有货','105/个','不支持退换货','1000g'),(1010,'东南瓜',0.01,NULL,'“‘上海精神’产生的强大凝聚力是本组织发展的保证。我们要保持团结协作的良好传统，新老成员国密切融合，深化政治互信，加大相互支持，构建平等相待、守望相助、休戚与共、安危共担的命运共同体。”\n　　          习近平主席的精辟阐述，深刻揭示了“上海精神”超越时代和地域的生命力和价值。“上海精神”为所有致力于睦邻友好和共同繁荣的国家提供了有益借鉴，也为国际社会构建以合作共赢为核心的新型国际关系实践注入了强大动力。\n　　          上合组织青岛峰会，是中共十九大后上合组织首次峰会，中国再次成为轮值主席国。新时代中国外交方针政策得到广泛认同，改革再深化、开放再扩大的一系列举措得到各国欢迎。新时代，中国将为上合组织未来发展提供什么样的智慧与方案？\n　　          <br>当前，国际和地区形势正在经历深刻复杂变化。本地区安全形势总体稳定，但 “三股势力”的危害依然严峻，毒品走私、跨国有组织犯罪、信息安全等问题依然突出。如何进一步加强协作，维护地区安全稳定？\n　　          上合组织去年首次扩员，新机遇也意味着新挑战。如何将扩员后形成的巨大势能转化为促进合作的动能？','2018-06-06 17:31:49',NULL,1,0,'有货','1000g/袋','不支持退换货','100g'),(1011,'东北瓜',0.01,NULL,'“‘上海精神’产生的强大凝聚力是本组织发展的保证。我们要保持团结协作的良好传统，新老成员国密切融合，深化政治互信，加大相互支持，构建平等相待、守望相助、休戚与共、安危共担的命运共同体。”\n　　          习近平主席的精辟阐述，深刻揭示了“上海精神”超越时代和地域的生命力和价值。“上海精神”为所有致力于睦邻友好和共同繁荣的国家提供了有益借鉴，也为国际社会构建以合作共赢为核心的新型国际关系实践注入了强大动力。\n　　          上合组织青岛峰会，是中共十九大后上合组织首次峰会，中国再次成为轮值主席国。新时代中国外交方针政策得到广泛认同，改革再深化、开放再扩大的一系列举措得到各国欢迎。新时代，中国将为上合组织未来发展提供什么样的智慧与方案？\n　　          <br>当前，国际和地区形势正在经历深刻复杂变化。本地区安全形势总体稳定，但 “三股势力”的危害依然严峻，毒品走私、跨国有组织犯罪、信息安全等问题依然突出。如何进一步加强协作，维护地区安全稳定？\n　　          上合组织去年首次扩员，新机遇也意味着新挑战。如何将扩员后形成的巨大势能转化为促进合作的动能？','2018-06-06 17:33:23',NULL,1,0,'无货','1000g/袋','不支持退换货','100g'),(1012,'西南瓜',0.01,NULL,'await is a reserved word','2018-06-06 17:45:35',NULL,1,0,'无货','1000g/袋','不支持退换货','100g'),(1013,'中南瓜',128.00,NULL,'的说法','2018-06-06 18:15:05',NULL,1,3,'有货','1000g/袋','不支持退换货','100g'),(1014,'中中瓜',100.00,NULL,'eight: 100%;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-font-smoothing: antialiased;\n    text-rendering: optimizeLegibility;\n    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;\n}','2018-06-06 18:22:36',NULL,1,0,'有货','1000g/袋','不支持退换货','100g'),(1015,'中西瓜',1.20,NULL,'因为 v-if 是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个 <template> 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 <template> 元素。','2018-06-08 16:51:08',NULL,1,1,'无货','1000g/袋','不支持退换货','100g'),(1016,'苹果',100.01,NULL,'hefowel wefnwerlfg','2018-06-08 17:52:01',NULL,1,1,'有货','1000g/袋','不支持退换货','100g');

#
# Structure for table "t_product_image"
#

DROP TABLE IF EXISTS `t_product_image`;
CREATE TABLE `t_product_image` (
  `Id` int(11) NOT NULL DEFAULT '0',
  `pid` int(11) DEFAULT NULL,
  `url` varchar(150) DEFAULT '/image/s6.png',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "t_product_image"
#

INSERT INTO `t_product_image` VALUES (1,1001,'http://127.0.0.1:5757/images/s4.png'),(2,1002,'http://127.0.0.1:5757/images/s5.png'),(3,1003,'http://127.0.0.1:5757/images/s6.png'),(4,1004,'http://127.0.0.1:5757/images/s5.png'),(5,1005,'http://127.0.0.1:5757/images/s6.png'),(6,1006,'http://127.0.0.1:5757/images/s3.png'),(7,1007,'http://127.0.0.1:5757/images/s6.png'),(8,1008,'http://127.0.0.1:5757/images/c2.png'),(9,1009,'http://127.0.0.1:5757/images/c3.png'),(10,1010,'http://127.0.0.1:5757/images/c4.png'),(11,1011,'http://127.0.0.1:5757/images/c2.png'),(12,1012,'http://127.0.0.1:5757/images/s3.png'),(13,1013,'http://127.0.0.1:5757/images/s4.png'),(14,1014,'http://127.0.0.1:5757/images/s5.png'),(15,1015,'http://127.0.0.1:5757/images/s5.png'),(16,1016,'http://127.0.0.1:5757/images/s2.png');

#
# Structure for table "t_userinfo"
#

DROP TABLE IF EXISTS `t_userinfo`;
CREATE TABLE `t_userinfo` (
  `openid` varchar(50) NOT NULL,
  `loginname` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `tel` varchar(30) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `wechatno` varchar(50) DEFAULT NULL,
  `qqno` varchar(50) DEFAULT NULL,
  `isuse` int(11) DEFAULT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`openid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

#
# Data for table "t_userinfo"
#


#
# Structure for table "user_address"
#

DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `openid` varchar(50) DEFAULT NULL,
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `district` varchar(50) DEFAULT NULL,
  `detail` varchar(100) DEFAULT NULL,
  `tel` varchar(30) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  `no` int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

#
# Data for table "user_address"
#

INSERT INTO `user_address` VALUES ('110','安徽','蚌埠','龙子湖区','盛翔家园','666','凌扶风',1),('110','安徽','安徽','怀宁','凌扶风家','336','董老姐',2),('110','台湾','南投','花莲','总统府','446','盛翔',3),('115','杭州','男的','下，没','绿园','3333','阿绿',4),('110','安徽','阜阳','太和','爱哦尼亚财局之地黑色玫瑰安营智联的风景和卡卡和港口和集体你可别v二hi和','30265485321','战神',5),('110','安徽','芜湖','弋江区','花津南路安徽师范大学花津校区夏沁园20栋','226460','金璐',6),('110','广东','广州','天河区','金星','1321313','蓝桥',7),('110','加利福尼亚','三藩市','皇后区','麦迪逊广场','+01-52339','床破',8),('110','四川省','成都市','金牛区','NM$L,X$WL,W$ND,HQYZ','48481846','孙笑川',9),('110','安徽','芜湖','弋江区','安徽师范大学花津校区','54646431','李敬霖',10),('110','安徽','安徽','弋江区','安徽师范大学花津校区','54646431','李3',11),('110','赛博坦','汽车人城','机械大道','修理厂','464646','通天晓',12);
