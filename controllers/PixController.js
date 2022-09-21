const { Op } = require('sequelize');
const PixModel = require('../models/Pix');
const UserModel = require('../models/User');

class PixController {

  index = async (req, res, next) => {
    const pix = await PixModel.findAll({
      include: [{
        model: UserModel,
        as: 'recipient',
        attributes: ['id', 'name']
      }, {
        model: UserModel,
        as: 'sender',
        attributes: ['id', 'name']
      }]
    });
    res.json(pix);
  }


  show = async (req, res, next) => {
    /* #swagger.parameters['type'] = {
        description: "sent or received"
    } 
    */
    const params = req.params;
    const where = {};

    if (params.type === 'received') {
      where.recipientId = params.userId;
    } else if (params.type === 'sent') {
      where.senderId = params.userId;
    }

    const pix = await PixModel.findAll({
      where: where,
      include: [{
        model: UserModel,
        as: 'recipient',
        attributes: ['id', 'name']
      }, {
        model: UserModel,
        as: 'sender',
        attributes: ['id', 'name']
      }]
    });
    res.json(pix);
  }

  create = async (req, res, next) => {
    try {

      /* 
        #swagger.parameters['body'] = { 
          description: 'Body', 
          required: true,
          type: 'json',
          in: 'body',
          example: "{  \"senderId\": 1,  \"recipientId\": 2,  \"value\": 50.5  }",
        }
      */

      const data = await this._validateAttributes(req.body);
      console.log(data);

      await this._validateUserId(data.senderId);
      await this._validateUserId(data.recipientId);
      await this._validateValue(data.value);

      const pix = await PixModel.create(data);
      res.json(pix);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  _validateAttributes = async (data) => {
    const attributes = ['value', 'senderId', 'recipientId'];
    const pix = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      pix[attribute] = data[attribute];
    }

    return pix;
  }

  _validateUserId = async (userId) => {
    const user = await UserModel.findByPk(userId);
    if (!user) {
      throw new Error(`The user ${userId} doesn't exists.`);
    }
  }

  _validateValue = async (value) => {
    if (value <= 0) {
      throw new Error(`The value must be greater than 0`);
    }
  }
}

module.exports = new PixController();
