'use strict';
module.exports = function (sequelize, DataTypes) {
  var products = sequelize.define('product', {
    firstName: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING,
    },
    telephone: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    address: {
      type: DataTypes.STRING,
      validate: { notEmpty: true }
    },
    campaignId: {
      type: DataTypes.NUMBER,
      validate: { notEmpty: true }
    }
  },
    {
      timestamps: false,
      tableName: 'product'
    });
  return products;
};