import * as mySQL from "../SQL/mySQL";

var originNO = 0;



const getOriginNo = async() => {
    if (originNO == 0) {
        let myQuery = `SELECT COUNT(billno) as no FROM t_bill`;
        let result = await mySQL.queryPromise(myQuery);
        originNO = result[0].no;
        console.log(originNO);
    }
}

getOriginNo();

let getOrderNo = () => { //生成订单号
    originNO++
    return originNO + 1000000000;
}

let getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

let crossDomain  = (req, res, next)=>{
    let accessOriginArray = new Array(10);
    accessOriginArray = [
      'http://localhost:9528'
    ];
    let origin = req.headers.origin;
    if (accessOriginArray.indexOf(origin) !== -1) {
      // console.log(accessOriginArray.indexOf(origin));
      // console.log(origin);
      // console.log(res.getHeader("Access-Control-Allow-Origin"));
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      accessOriginArray.push(origin);
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Encoding", 'gzip, deflate');
    // res.header("Content-Language", 'zh-CN,zh;q=0.9');
    // res.header("Content-Type", "text/plain");
  
    /**
     * 跨域复杂请求时会先发送一个'OPTIONS'请求探路，当服务端回复200之后，前端才会发送正常的复杂请求
     */
    if (req.method === 'OPTIONS') {
      res.status(200);
      res.end();
    } else {
      next();
    }
  }

let timeFormatter = (value)=>{
    console.log(value);
      let da = new Date(value.replace("/Date(", "").replace(")/", "").split("+")[0]);
      console.log('OK')
      return da.getFullYear() + "-" + ((da.getMonth() + 1) < 10 ? "0" + (da.getMonth() + 1) : (da.getMonth() + 1)) + "-" + (da.getDate() < 10 ? "0" + da.getDate() : da.getDate()) + " " + (da.getHours() < 10 ? "0" + da.getHours() : da.getHours()) + ":" + (da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes()) + ":" + (da.getSeconds() < 10 ? "0" + da.getSeconds() : da.getSeconds());
  }

export {
    getOrderNo,
    getNowFormatDate,
    crossDomain,
    timeFormatter
}