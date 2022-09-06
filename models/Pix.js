const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const User = require('./User');

class Pix extends Model { };

Pix.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  value: {
    type: DataTypes.REAL(10, 2),
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'pix',
  modelName: 'Pix'
});

User.hasMany(Pix, {
  as: 'recipient',
  foreignKey: 'recipientId'
});

User.hasMany(Pix, {
  as: 'sender',
  foreignKey: 'senderId'
});

Pix.belongsTo(User, {
  as: 'recipient',
  foreignKey: 'recipientId'
});

Pix.belongsTo(User, {
  as: 'sender',
  foreignKey: 'senderId'
});


module.exports = Pix;
