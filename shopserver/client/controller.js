import {
    commodity
} from "../source/newest";
import * as mySQL from "../SQL/mySQL";
import * as tools from './tools'
import {
    fail
} from "assert";

let getDetail = function (req, res) {
    let myQuery = 'SELECT a.pid,productname AS name,price,describle AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        let selected = data.find(p => p.pid == req.query.pid);
        res.send(selected)
    })
}

let getCommodity = function (req, res) {
    let myQuery = 'SELECT a.pid,productname AS name,price,describle AS detail,status,parameter,service,weight,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send(data);
        console.log(data)
    });
}

let getRow = function (req, res) {
    let result = mySQL.queryAsync('select  * from user_address');
    result.then(data => {
        let hape = data[0].openid;
        console.log(data);
        res.send(hape);
    })
}

/**************************************************************************************************************** */
/*******************************************地址管理************************************************************** */
/**************************************************************************************************************** */

let getAddress = (req, res) => {
    console.log(req.body)
    let result = mySQL.queryAsync(`select no,name,province,city,district,detail,tel from user_address where openid = "${req.body.openid}"`);
    result.then(data => {
        res.send(data);
    })
}

let addressAdd = (req, res) => {
    let myQuery = `insert into user_address (name,province,city,district,detail,tel,openid) value ('${req.body.name}','${req.body.province}','${req.body.province}','${req.body.district}','${req.body.detail}','${req.body.tel}','${req.body.openid}')`;
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send('ok');
        console.log(data)
    }).catch(data => {
        res.send(data)
    })
    res.send('ok');
    console.log(req.body);
}

let addressModify = (req, res) => {
    let myQuery = `UPDATE user_address SET province = '${req.body.province}',city = '${req.body.province}',district = '${req.body.district}',detail = '${req.body.detail}',tel = '${req.body.tel}',name = '${req.body.name}' WHERE no = ${req.body.no}`;
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send('ok');
        console.log(data);
    }).catch(data => {
        res.send('fail')
    });
    console.log(req.body);
}

let addressDel = (req, res) => {
    let myQuery = `DELETE FROM user_address WHERE no = ${req.body.no}`;
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send('ok');
        console.log(data);
    }).catch(data => {
        res.send('fail')
    });
    console.log(req.body);
}
/**************************************************************************************************************** */
/*******************************************购物车**************************************************************** */
/**************************************************************************************************************** */
let getCart = (req, res) => {
    console.log(req.body);
    let myQuery = `SELECT a.pid,num,productname,url AS image,price FROM cart a JOIN t_product b ON a.pid = b.pid LEFT JOIN t_product_image c ON c.pid = a.pid WHERE openid = ${req.body.openid}`;
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send(data);
    })
}

let delCart = (req, res) => {
    let myQuery = `DELETE FROM cart WHERE openid = ${req.body.openid} AND pid = ${req.body.pid}`;
    let result = mySQL.queryAsync(myQuery);
    result.then(data => {
        res.send('ok');
        console.log(data);
    }).catch(data => {
        res.send('fail')
    });
    console.log(req.body);
}

let modifyCart = (req, res) => {
    console.log(req.body.carts);
    req.body.carts.forEach(element => {
        let myQuery = `UPDATE cart SET num = '${element.num}' WHERE openid = ${req.body.openid} AND pid = ${element.pid}`;
        let result = mySQL.queryAsync(myQuery);
        result.then(data => {
            res.send('ok');
            console.log(data);
        }).catch(data => {
            res.send('fail')
        });
    });
}

let addCart = (req, res) => {
    let myQuery1 = `SELECT COUNT(*) AS had FROM cart WHERE openid = ${req.body.openid} AND pid = ${req.body.pid} `;
    let result1 = mySQL.queryAsync(myQuery1);
    result1.then(data1 => {
        console.log(data1[0].had)
        if (data1[0].had) { //已存在，修改数值
            let myQuery = `UPDATE cart SET num = (num + '${req.body.num}') WHERE openid = ${req.body.openid} AND pid = ${req.body.pid}`;
            let result = mySQL.queryAsync(myQuery);
            result.then(data => {
                res.send('ok');
                console.log(data);
            }).catch(data => {
                res.send('fail')
            });
        } else { //不存在，新添加到购物车
            let myQuery = `insert into cart (pid,num,openid) value ('${req.body.pid}','${req.body.num}','${req.body.openid}')`;
            let result = mySQL.queryAsync(myQuery);
            result.then(data => {
                res.send('ok');
            }).catch(data => {
                res.send(data)
            })
        }
    }).catch(res => {
        res.send(data)
    })
}

let addBill = (req, res) => {
    let billNO = tools.getOrderNo();
    let date = tools.getNowFormatDate();
    let myQuery1 = `insert into t_bill (billno,createtime,fee,openid) value ('${billNO}','${date}','${req.body.fee}','${req.body.openid}')`;
    let result1 = mySQL.queryAsync(myQuery1);
    result1.then(data => {
        req.body.goods.forEach(element => {
            let myQuery = `insert into bill_product (billno,pid,number) value (${billNO},${element.pid},${element.num})`;
            let result = mySQL.queryAsync(myQuery);
            result.then(data => {
                res.send(element.pid +':ok');
                console.log(data);
            }).catch(data => {
                res.send('insert fail');
                console.log(data)
            });
        })
    }).catch(
        data => {
            res.send('fail');
            console.log('fail')
        }
    )
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