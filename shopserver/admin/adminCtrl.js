import * as mySQL from "../SQL/mySQL";
import * as tools from '../client/tools'

let getProducts = async (req, res)=>{
    let myQuery = 'SELECT a.pid,productname AS name,price,description,status,parameter,service,weight,isuse,type,createtime,url as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = await await mySQL.queryPromise(myQuery);
    res.send({
        total: result.length,
        items: result,
        code: 20000
    });
}

let addProduct = async (req,res)=>{
    let date = tools.getNowFormatDate();
    console.log(date)
    let myQuery = `insert into t_product (productname,price,description,status,parameter,service,weight,createtime) value ('${req.body.productname}','${req.body.price}','${req.body.description}','${req.body.status}','${req.body.parameter}','${req.body.service}','${req.body.weight}','${date}')`;
    let result = await await mySQL.queryPromise(myQuery);
    try {
        res.send('success')
    } catch (error) {
        res.send('fail')
    }
}

let modifyIsuse = async (req,res)=>{
    console.log(req.body)
    let myQuery = `UPDATE t_product SET isuse = '${req.body.isuse}' WHERE pid = ${req.body.pid}`;
    let result = await mySQL.queryPromise(myQuery);
    try {
        console.log('ok')
        res.send({
            code:20000
        });
    } catch (error) {
        res.send('fail')
    }
}

export{
    getProducts,
    addProduct,
    modifyIsuse
}