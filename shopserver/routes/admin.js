var express = require('express');
var router = express.Router();

import * as admin from '../admin/adminCtrl'


/* GET admin listing. */
router.get('/', function(req, res, next) {
  res.send('admin');
});

router.get('/products',(req,res)=>{
    console.log('products:')
    admin.getProducts(req,res);
})



module.exports = router;