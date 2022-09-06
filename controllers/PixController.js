const { Op } = require('sequelize');
const PixModel = require('../models/Pix');
const UserModel = require('../models/User');

class PixController {

  index = async (req, res, next) => {
    const params = req.params;
    const where = {};

    if (params.type === 'received') {
      where.recipientId = params.userId;
    } else if (params.type === 'sent') {
      where.senderId = params.userId;
    }

    const states = await PixModel.findAll({
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
    res.json(states);
  }

  create = async (req, res, next) => {
    try {

      /* 
        #swagger.parameters['body'] = { 
          description: 'Body', 
          required: true,
          type: 'json',
          in: 'body',
          example: '{
            senderId: 1,
            recipientId: 2,
            value: 50.5
          }',
        }
      */

      const data = await this._validateData(req.body);
      const pix = await PixModel.create(data);
      res.json(pix);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  _validateData = async (data) => {
    const attributes = ['value', 'senderId', 'recipientId'];
    const state = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      state[attribute] = data[attribute];
    }

    return state;
  }
}

module.exports = new PixController();
