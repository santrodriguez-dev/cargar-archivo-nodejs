'use strict';
module.exports = function (sequelize, DataTypes) {
  var usuarios = sequelize.define('campaign', {
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    tipo_usuario: {
      type: DataTypes.ENUM("admin", "usuario"),
      validate: {
        isIn: [
          ['admin', 'usuario']
        ],
        notEmpty: true
      }
    },
    saldo: DataTypes.FLOAT
  }, {
  });
  return usuarios;
};