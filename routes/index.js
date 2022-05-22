let router = require('express').Router();

router.use('/auth', require('./auth/auth'));
router.use('/api', require('./api'));
module.exports = router;