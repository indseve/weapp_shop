import * as mySQL from "../SQL/mySQL";
import * as tools from '../client/tools'

let getProducts = async (req, res)=>{
    let myQuery = 'SELECT a.pid,productname AS name,price,describle AS detail,status,parameter,service,weight,url,isuse as image FROM t_product AS a LEFT JOIN t_product_image AS b ON a.pid = b.pid';
    let result = await await mySQL.queryPromise(myQuery);
    res.send(result);
}

export{
    getProducts
}