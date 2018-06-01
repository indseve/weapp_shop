var express = require('express');
var router = express.Router();
import * as controller from '../client/controller';
import { getRow } from "../SQL/mySQL";
//import {getRow} from '../test'
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/newest', function (req, res, next) {
  controller.getCommodity(req,res);
});
router.get('/detail', function (req, res, next) {
  controller.getDetail(req,res);
});
router.get('/test',function(req,res,next){
 controller.getRow(req,res);
})
router.post('/openid',function(req,res) {
  
})

/**************************************************************************************************************** */
/*******************************************地址管理************************************************************** */
/**************************************************************************************************************** */

router.post('/getAddress',(req,res)=>{
  controller.getAddress(req,res)
})

router.post('/addressAdd',(req,res)=>{
  controller.addressAdd(req,res);
})

router.post('/addressModify',(req,res)=>{
  controller.addressModify(req,res);
})

router.post('/addressDel',(req,res)=>{
  controller.addressDel(req,res);
})

/**************************************************************************************************************** */
/*******************************************购物车**************************************************************** */
/**************************************************************************************************************** */

router.post('/getCart',(req,res)=>{
  controller.getCart(req,res);
})

router.post('/delCart',(req,res)=>{
  controller.delCart(req,res);
})

router.post('/modifyCart',(req,res)=>{
  controller.modifyCart(req,res);
})

router.post('/addCart',(req,res)=>{
  console.log(req.body)
  controller.addCart(req,res);
})

router.post('/addBill',(req,res)=>{
  console.log(req.body)
  controller.addBill(req,res);
})

module.exports = router;