import {
    commodity
} from "../source/newest";
import * as mySQL from "../SQL/mySQL";
import * as tools from './tools'
import {
    fail
} from "assert";

let getDetail = async (req, res)=>{
    let myQuery = `SELECT a.pid,productname AS name,price,describle AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid WHERE a.pid = ${req.query.pid}`;
    let result = await await mySQL.queryPromise(myQuery);
    //let selected = result.find(p => p.pid == req.query.pid);
    res.send(result);
    // result.then(data => {
    //     let selected = data.find(p => p.pid == req.query.pid);
    //     res.send(selected)
    // })
}

let getCommodity = async (req, res)=>{
    let myQuery = 'SELECT a.pid,productname AS name,price,describle AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = await await mySQL.queryPromise(myQuery);
    res.send(result);
}

let getRow = function (req, res) {
    let result = await mySQL.queryPromise('select  * from user_address');
    
}

/**************************************************************************************************************** */
/*******************************************地址管理************************************************************** */
/**************************************************************************************************************** */

let getAddress = async (req, res) => {
    console.log(req.body)
    let result = await mySQL.queryPromise(`select no,name,province,city,district,detail,tel from user_address where openid = "${req.body.openid}"`);
    res.send(result)
}

let addressAdd = async (req, res) => {
    let myQuery = `insert into user_address (name,province,city,district,detail,tel,openid) value ('${req.body.name}','${req.body.province}','${req.body.province}','${req.body.district}','${req.body.detail}','${req.body.tel}','${req.body.openid}')`;
    let result = await mySQL.queryPromise(myQuery);
    result.then(data => {
        res.send('ok');
        console.log(data)
    }).catch(data => {
        res.send(data)
    })
    res.send('ok');
    console.log(req.body);
}

let addressModify = async (req, res) => {
    let myQuery = `UPDATE user_address SET province = '${req.body.province}',city = '${req.body.province}',district = '${req.body.district}',detail = '${req.body.detail}',tel = '${req.body.tel}',name = '${req.body.name}' WHERE no = ${req.body.no}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('ok');
    } catch (error) {
        res.send('fail')
    }
}

let addressDel = async (req, res) => {
    let myQuery = `DELETE FROM user_address WHERE no = ${req.body.no}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('ok');
    } catch (error) {
        res.send('fail')
    }
}
/**************************************************************************************************************** */
/*******************************************购物车**************************************************************** */
/**************************************************************************************************************** */
let getCart = async (req, res) => {
    console.log(req.body);
    let myQuery = `SELECT a.pid,num,productname,url AS image,price FROM cart a JOIN t_product b ON a.pid = b.pid LEFT JOIN t_product_image c ON c.pid = a.pid WHERE openid = ${req.body.openid}`;
    let result = await mySQL.queryPromise(myQuery);
    res.send(result)
}

let delCart = async (req, res) => {
    let myQuery = `DELETE FROM cart WHERE openid = ${req.body.openid} AND pid = ${req.body.pid}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send('ok');
    } catch (error) {
        res.send('fail')
    }
}

let modifyCart = async (req, res) => {
    console.log(req.body.carts);
    req.body.carts.forEach(element => {
        let myQuery = `UPDATE cart SET num = '${element.num}' WHERE openid = ${req.body.openid} AND pid = ${element.pid}`;
        let result = await mySQL.queryPromise(myQuery);
        try {
            res.send('ok');
        } catch (error) {
            res.send('fail')
        }
    });
}

let addCart = async (req, res) => {
    let selectQuery = `SELECT COUNT(*) AS had FROM cart WHERE openid = ${req.body.openid} AND pid = ${req.body.pid} `;
    let selectResult = await mySQL.queryPromise(selectQuery);
    try {
        if (selectResult.had) { //已存在，修改数值
            let myQuery = `UPDATE cart SET num = (num + '${req.body.num}') WHERE openid = ${req.body.openid} AND pid = ${req.body.pid}`;
            let result = await mySQL.queryPromise(myQuery);
            try {
                res.send('ok');
            } catch (error) {
                res.send('fail')
            }
        } else { //不存在，新添加到购物车
            let myQuery = `insert into cart (pid,num,openid) value ('${req.body.pid}','${req.body.num}','${req.body.openid}')`;
            let result = await mySQL.queryPromise(myQuery);
            try {
                res.send('ok');
            } catch (error) {
                res.send('fail')
            }
        }
    } catch (error) {
        res.send('fail: '+ selectResult)
    }    
}

let addBill = async (req, res) => {
    let billNO = tools.getOrderNo();
    let date = tools.getNowFormatDate();
    let insertMyQuery = `insert into t_bill (billno,createtime,fee,openid) value ('${billNO}','${date}','${req.body.fee}','${req.body.openid}')`;
    let insertResult = await mySQL.queryPromise(myQuery1);
    try {
        req.body.goods.forEach(element => {
            let myQuery = `insert into bill_product (billno,pid,number) value (${billNO},${element.pid},${element.num})`;
            let result = await mySQL.queryPromise(myQuery);
            try {
                res.send(element.pid +':ok');
            } catch (error) {
                res.send('insert fail');
            }
        })
    } catch (error) {
        res.send('fail');
    }
}

export {
    getDetail,
    getCommodity,
    getRow,
    getAddress,
    addressAdd,
    addressModify,
    addressDel,
    getCart,
    delCart,
    modifyCart,
    addCart,
    addBill
};