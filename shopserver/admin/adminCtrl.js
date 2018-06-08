import * as mySQL from "../SQL/mySQL";
import * as tools from '../client/tools'


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

let addProduct = async (req,res)=>{
    let date = tools.getNowFormatDate();
    let myQuery = `insert into t_product (productname,price,description,status,parameter,service,weight,type,createtime) value ('${req.body.productname}','${req.body.price}','${req.body.description}','${req.body.status}','${req.body.parameter}','${req.body.service}','${req.body.weight}','${req.body.typeno}','${date}')`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send({
            info:'success'
        })
        console.log('success')
    } catch (error) {
        res.send({
            info:'fail'
        })
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
    let myQuery = `UPDATE t_product SET productname = '${req.body.productname}',price = '${req.body.price}',description ='${req.body.description}',type = '${req.body.typeno}' WHERE pid = ${req.body.pid}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('success');
    } catch (error) {
        res.send('fail')
    }
}

export{
    login,
    getProducts,
    addProduct,
    modifyIsuse,
    getOrders,
    getBillProducts,
    modifyProduct
}