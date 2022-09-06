const { Op } = require('sequelize');
const UserModel = require('../models/User');

class UsersController {

  index = async (req, res, next) => {
    const users = await UserModel.findAll({});
    res.json(users);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  _validateData = async (data, id) => {
    const attributes = ['name'];
    const user = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }


    return user;
  }

}

module.exports = new UsersController();
