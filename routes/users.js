const router = require('express').Router();
const UserModel = require('../models/User');
const usersController = require('../controllers/UsersController');

const validateUserId = async (req, res, next) => {
  if (req.params.userId === 'null') {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = await UserModel.findByPk(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  next();
}

router.get('/users', usersController.index);

//router.post('/users', usersController.create);

//router.get('/users/:userId', validateUserId, usersController.show);

module.exports = router;
