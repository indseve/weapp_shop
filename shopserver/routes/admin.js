var express = require('express');
var router = express.Router();

import * as admin from '../admin/adminCtrl'

router.post('/login',(req,res)=>{
  admin.login(req,res);
})
/* GET admin listing. */
router.get('/', function(req, res, next) {
  console.log('get product')
  res.send('admin');
});

router.get('/products',(req,res)=>{
    admin.getProducts(req,res);
})

router.post('/addProduct',(req,res)=>{
  admin.addProduct(req,res);
})

router.post('/modifyIsuse',(req,res)=>{
  admin.modifyIsuse(req,res);
})

router.get('/orders',(req,res)=>{
  admin.getOrders(req,res);
})

router.post('/getBillProducts',(req,res)=>{
  admin.getBillProducts(req,res);
})

module.exports = router;