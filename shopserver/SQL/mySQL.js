import { createPool } from "mysql";
import { sqlConfig } from "../globaldata";
const pool = createPool({
    connectionLimit: 10,
    host: sqlConfig.host,
    port: sqlConfig.port, // 数据库连接的端口号 默认是3306  
    database: sqlConfig.database, // 需要查询的数据库 
    user: sqlConfig.user,
    password: sqlConfig.password
});

const queryPromise = function (myQuery) {
    return new Promise((resolve, reject) => {
        pool.query(myQuery, (err, rows, fields) => {
            if (err) reject(err);

            else resolve(rows)
        })
    })
}


// const queryPromise = function (myQuery) {
//     return new Promise((resolve, reject) => {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err)
//             } else {
//                 connection.query(myQuery, (err, rows) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve(rows)
//                     } // 结束会话 
//                     connection.release()
//                 })
//             }
//         })
//     })
// }


const queryAsync = async (myQuery)=>{
    let result = await queryPromise(myQuery);  
    console.log(result)   
    return result;
 }



 export {
     queryPromise
 }