import * as mySQL from "../SQL/mySQL";
import * as tools from '../client/tools';
var formidable = require("formidable");  
var fs = require('fs');


let login = async (req,res)=>{
    console.log(req.body)
    if (req.body.username == 'admin' && req.body.password == 'admin') {
        res.send({
            code: 20000,
            roles: ['admin'],
            token: 'admin',
            introduction: '我是超级管理员',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: 'Super Admin'
        })
    } else {
        res.send({
            code: 50
        })
    }
}

/**************************************************************************************************************** */
/*********************************************商品*************************************************************** */
/**************************************************************************************************************** */
let getProducts = async (req, res)=>{
    let myQuery = 'SELECT a.pid,productname AS name,price,description,status,parameter,service,weight,isuse,type,createtime,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = await await mySQL.queryPromise(myQuery);
    res.send({
        total: result.length,
        items: result
    });
}

let addProduct = async (req, res) => {
    let date = tools.getNowFormatDate();
    let myQuery = `insert into t_product (productname,price,description,status,parameter,service,weight,type,createtime) value ('${req.body.productname}','${req.body.price}','${req.body.description}','${req.body.status}','${req.body.parameter}','${req.body.service}','${req.body.weight}','${req.body.typeno}','${date}')`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        let imageMyQuery = `insert into t_product_image (pid,url) value ( (SELECT MAX(pid) FROM t_product) ,'${req.body.imageUrl}')`;
        let imageResult = await mySQL.queryPromise(imageMyQuery);
        try {
            res.send('success')
            console.log('success')
        } catch (error) {
            res.send('fail')
        }
    } catch (error) {
        res.send('fail')
    }
}

let modifyIsuse = async (req,res)=>{
    let myQuery = `UPDATE t_product SET isuse = '${req.body.isuse}' WHERE pid = ${req.body.pid}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('success');
    } catch (error) {
        res.send('fail')
    }
}

/**************************************************************************************************************** */
/*******************************************订单管理************************************************************** */
/**************************************************************************************************************** */

let getOrders = async (req,res)=>{
    console.log(req.query)
    let myQuery = 'SELECT billno,createtime,fee,a.openid,ifsend,fkstatus,status,province,city,district,detail,tel,name FROM t_bill a LEFT JOIN user_address b ON a.address = b.no';
    let result = await mySQL.queryPromise(myQuery);
    try {
        console.log('ok')
        let data  = result;
        if(req.query.page)
        {
            let limit = req.query.limit;
            let page = req.query.page;
            data = result.filter((item, index) => index < limit * page && index >= limit * (page - 1));
            console.log(data)
        }
        res.send({
            total: result.length,
            items: data
        });
    } catch (error) {
        res.send({
            data: 'fail'
        })
    }
}

let getBillProducts = async (req,res)=>{
    let myQuery = `SELECT a.pid,number,productname,price FROM bill_product AS a LEFT JOIN t_product AS b ON a.pid = b.pid WHERE a.billno = ${req.body.billno}`;
    let result = await await mySQL.queryPromise(myQuery);
    try {
        res.send(result)
    } catch (error) {
        res.send('fail')
    }
}

let modifyProduct = async (req,res)=>{
    console.log(req.body)
    let myQuery = `UPDATE t_product a,t_product_image b SET a.productname = '${req.body.productname}',a.price = '${req.body.price}',a.description ='${req.body.description}',a.type = '${req.body.typeno}',b.url = '${req.body.imageUrl}' WHERE a.pid = ${req.body.pid} AND b.pid = ${req.body.pid}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('success');
    } catch (error) {
        res.send(error)
    }
}

let upImage = (req, res) => {
    let form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public/images/'; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

    form.parse(req, function (err, fields, files) {

        if (err) {
            res.locals.error = err;
            res.render('index', {
                title: TITLE
            });
            return;
        }
        console.log(files.file.path);

        var extName = ''; //后缀名
        switch (files.file.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        var avatarName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + avatarName;
        //显示地址；
        var showUrl = 'http://127.0.0.1:5757/images/' + avatarName;
        console.log("newPath", newPath);
        fs.renameSync(files.file.path, newPath); //重命名
        res.json({
            "newPath": showUrl
        });
    });
}

export{
    login,
    getProducts,
    addProduct,
    modifyIsuse,
    getOrders,
    getBillProducts,
    modifyProduct,
    upImage
}