const router = require('express').Router();
// const PixModel = require('../models/Pix');
const UserModel = require('../models/User');
const pixController = require('../controllers/PixController');

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

router.post('/pix', pixController.create);

router.get('/pix', pixController.index);

router.get('/pix/:userId/:type', validateUserId, pixController.show);

module.exports = router;
