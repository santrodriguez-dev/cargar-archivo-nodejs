var productModel = require('../models').product;

var express = require('express');
var cors = require('cors')

var app = express()
app.use(cors())
// var router = express.Router();

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/product/upload-products', function (req, res, next) {

  productModel.bulkCreate(req.body).then(function (products) {
    res.json(products)
  }).catch(function (err) {
    console.log(err)
    res.status(500).send({
      error: err,
      mensaje: "Ha ocurrido un error!",
    });
  });

});

app.get('/product/getByCampaignId/:id', function (req, res, next) {

  productModel.findAll({
    where: { campaign_id: req.params.id },
  }).then(function (products) {
    res.json(products)
  }).catch(function (err) {
    console.log(err)
    res.status(500).send({
      error: err,
      mensaje: "Ha ocurrido un error!",
    });
  });

});


module.exports = app;
