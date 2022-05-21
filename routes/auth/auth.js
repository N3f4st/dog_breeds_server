const router = require('express').Router();
const authService = require('./authService')

router.post('/sign', async(req, resp, done)=> {
    try {
        await authService.sign(req.body, resp);
    } catch (e) {
        resp.status(500).json({ status: 'Error', message: error.message });
    }
});

router.post('/user_register', async (req, resp, done)=> {

});

module.exports = router;