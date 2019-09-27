var productModel = require('../models').product;
var productController = require('../controllers/product');


var express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())
// var router = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Almacena los productos de una campaña
 */
app.post('/product/upload-products', productController.uploadProducts);

/**
 * Obtiene los productos de una campaña especifica
 */
app.get('/product/getByCampaignId/:id', productController.getByCampaignId);

module.exports = app;
