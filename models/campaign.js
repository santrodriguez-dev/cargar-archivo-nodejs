'use strict';
module.exports = function (sequelize, DataTypes) {
  var campaign = sequelize.define('campaign', {
    name: { type: DataTypes.STRING },
    date: { type: DataTypes.DATE }
  },
    {
      timestamps: false,
      tableName: 'campaign'
    });
  return campaign;
};