const router = require('express').Router();
const db = require('../../db')

const MLFRMD_ERR_MSJ = 'Malformed request.'; // When client does not request a properly body.
const BADAPPK_ERR_MSJ = 'Bad application key.'; // When client does not request a properly body.


router.post('/sign', async (req, resp, done)=> {

    // check if parameters exist.
    if (!req.body.user || !req.body.password || !req.body.appKey) {
        return resp.status(400).send(MLFRMD_ERR_MSJ);
    }

    const user = req.body.user,
          password = req.body.password,
          appKey = req.body.appKey;

    if (appKey !== process.env.APPKEY) {
        return resp.status(403).send(BADAPPK_ERR_MSJ);
    }

    const { rows } = await db.query('SELECT * FROM auth.app_user', []);
    resp.send(rows[0]);

});

module.exports = router;