const fs=require('fs');
const sqlConfig=JSON.parse(fs.readFileSync('./config.json')).sql;

var scrollImage = {
    baseUrl:`/images/scroll`,
    name:['b1.jpg','b2.jpg','b3.jpg']
}

var promotionData = {
    promotion: [{
        name:'1',
        size:'mini',
        cover:'s1.png',
        header: 'list1.png',
        list:['1001','1004','1005']
    },{
        name:'2',
        size:'mini',
        cover:'s2.png',
        header: 's3.png',
        list:['1002','1004','1005','1007']
    },{
        name:'3',
        size:'max',
        cover:'s3.png',
        header: 's3.png',
        list:['1001','1004','1005']
    },{
        name:'4',
        size:'max',
        cover:'list1.png',
        header: 'list1.png',
        list:['1002','1004','1005','1007']
    }],
    baseUrl:'/images/promotion'
}

export {
    sqlConfig,
    scrollImage,
    promotionData
}