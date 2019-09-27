var productModel = require('../models').product;
var campaignModel = require('../models').campaign;

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

  const { products, campaignName } = req.body

  saveCampaign(campaignName)
    .then((campaign) => saveProductsByCampaign(products, campaign.id))
    .then(products => {
      res.json(products)
    }).catch(function (err) {
      console.log(err)
      res.status(500).send(err.message);
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

const saveCampaign = (name) => {
  return campaignModel.create({
    name: name,
    date: new Date
  }).then((campaign) => {
    return campaign
  }).catch(function (err) {
    console.log(err)
    return err
  });
}

const saveProductsByCampaign = (products, campaignId) => {

  products = products.map(item => {
    return { ...item, campaignId }
  })

  return productModel.bulkCreate(products).then(function (products) {
    return products
  }).catch(function (err) {
    throw new Error(err);
    // return err
  });
}


module.exports = app;
