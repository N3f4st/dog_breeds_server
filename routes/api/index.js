const router = require('express').Router();
router.use('/dog-api-bypass', require('./dog-api-bypass/dog-api-bypass'));

module.exports = router;