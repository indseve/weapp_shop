import * as mySQL from "../SQL/mySQL";
import * as tools from './tools'
// import {
//     fail
// } from "assert";

let getDetail = async (req, res)=>{
    let myQuery = `SELECT a.pid,productname AS name,price,description AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid WHERE a.pid = ${req.query.pid}`;
    let result = await await mySQL.queryPromise(myQuery);
    //let selected = result.find(p => p.pid == req.query.pid);
    res.send(result);
    // result.then(data => {
    //     let selected = data.find(p => p.pid == req.query.pid);
    //     res.send(selected)
    // })
}

let getCommodity = async (req, res)=>{
    let myQuery = 'SELECT a.pid,productname AS name,price,description AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid WHERE isuse = 1';
    let result = await await mySQL.queryPromise(myQuery);
    res.send(result);
}

let getRow = async (req, res)=>{
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
    try {
        res.send('ok');
    } catch (error) {
        res.send('fail')
    }
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
    req.body.carts.forEach( async (element) => {
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
        if (selectResult[0].had) { //已存在，修改数值
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
    console.log(billNO,date)
    console.log(req.body)
    let insertMyQuery = `insert into t_bill (billno,createtime,fee,openid,address) value ('${billNO}','${date}','${req.body.fee}','${req.body.openid}','${req.body.no}')`;
    let insertResult = await mySQL.queryPromise(insertMyQuery);
    try {
        console.log('ok')
        req.body.goods.forEach( async (element) => {
            let myQuery = `insert into bill_product (billno,pid,number) value (${billNO},${element.pid},${element.num})`;
            let result = await mySQL.queryPromise(myQuery);
            try {
                console.log(element.pid +':ok')
                res.send('ok');
            } catch (error) {
                res.send('insert fail');
            }
        })
    } catch (error) {
        res.send('fail');
    }
}


let getBill = async (req,res)=>{
    // let data = {
    //     bill:'',
    //     product:''
    // };
    // let billMyQuery = `SELECT billno,createtime,fee,ifsend,fkstatus,address FROM t_bill WHERE openid = '${req.body.openid}' ORDER BY createtime DESC`;
    // let billResult  = await mySQL.queryPromise(billMyQuery);
    // try {
    //     data.bill = billResult[0];
    //     let productMyQuery = `SELECT a.pid,number,productname,price,url AS image FROM bill_product AS a LEFT JOIN t_product AS b ON a.pid = b.pid  LEFT JOIN t_product_image AS c ON a.pid = c.pid WHERE a.billno  = ${data.bill.billno}`;
    //     let productResult  = await mySQL.queryPromise(productMyQuery);
    //     try {
    //         data.product = productResult[0];
    //         res.send(data);
    //     } catch (error1) {
    //        res.send('fail product');
    //     }
    // } catch (error2) {
    //     res.send('fail bill');
    // }

    let myQuery = `SELECT a.billno,a.createtime,fee,ifsend,fkstatus,address,number,productname,price,url AS image FROM t_bill a LEFT JOIN bill_product b ON a.billno = b.billno LEFT JOIN t_product AS c ON c.pid = b.pid LEFT JOIN t_product_image AS d ON b.pid = d.pid WHERE openid = ${req.body.openid} GROUP BY a.billno`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        res.send(result);
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
    addBill,
    getBill
};