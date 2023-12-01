const router = require('express').Router();
// const PixModel = require('../models/Pix');
const UserModel = require('../models/User');
const pixController = require('../controllers/PixController');

const validateUserId = async (req, res, next) => {
    if (req.params.userId === 'null' || isNaN(req.params.userId)) {
        return res.status(404).json({ error: 'User not found' });
    }

    const user = await UserModel.findByPk(req.params.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    next();
}

const validateDifferentIds = async (req, res, next) => {
    if (req.body.senderId === req.body.recipientId) {
        return res.status(400).json({ error: 'hehehe, this is not allowed, brow!' });
    }
    next();
}

router.post('/pix', validateDifferentIds, pixController.create);

router.get('/pix', pixController.index);

router.get('/pix/:userId/:type', validateUserId, pixController.show);

module.exports = router;
