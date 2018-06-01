import * as mySQL from "../SQL/mySQL";

var originNO = 0;



const getOriginNo = () => {
    if (originNO == 0) {
        let myQuery = `SELECT COUNT(billno) as no FROM t_bill`;
        let result = mySQL.queryAsync(myQuery);
        result.then(
            data => {
                console.log(data[0].no)
                originNO = data[0].no;
            }
        )
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

export {
    getOrderNo,
    getNowFormatDate
}