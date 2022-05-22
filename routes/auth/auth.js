const router = require('express').Router();
const authService = require('./authService')

router.post('/sign', async(req, resp, done)=> {
    try {
        await authService.sign(req.body, resp);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});

router.post('/signup', async (req, resp, done)=> {
    try {
        await authService.signUp(req.body, resp);
    } catch (e) {
        return resp.status(500).json({ status: 'Error', message: e.message });
    }
});

module.exports = router;