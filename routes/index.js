const cors = require('cors');
const router = require('express').Router();
const users = require('./users');
const pix = require('./pix');

router.use(cors());

router.use(users);
router.use(pix);



module.exports = router;
