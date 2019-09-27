var productModel = require('../models').product;
var campaignModel = require('../models').campaign;


function uploadProducts(req, res, next) {

  const { products, campaignName } = req.body

  let campaignSaved;
  saveCampaign(campaignName)
    .then((campaign) => {
      campaignSaved = campaign
      return saveProductsByCampaign(products, campaign.id)
    })
    .then(products => {
      res.json({ campaignSaved, products })
    }).catch(function (err) {
      console.log(err)
      res.status(500).send(err.message);
    });
}

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
  //Agrega el codigo de la campaña a cada item de la lista de productos
  products = products.map(item => {
    return { ...item, campaignId }
  })

  return productModel.bulkCreate(products).then((products) => {
    return products
  }).catch(function (err) {
    throw new Error(err);
  });
}

function getByCampaignId(req, res, next) {
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
}

module.exports = {
  uploadProducts,
  getByCampaignId
};