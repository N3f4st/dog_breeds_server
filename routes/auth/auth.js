const router = require('express').Router();
const db = require('../../db');
const m = require('../../message_constants');
const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken')

router.post('/sign', async (req, resp, done)=> {

    if (!req.body.user || !req.body.password || !req.body.appKey) {
        return resp.status(400).send(m.MLFRMD_ERR_MSJ);
    }

    const user = req.body.user,
          formPassword = req.body.password,
          appKey = req.body.appKey,
          serverAppKey = process.env.APPKEY;

    if (!serverAppKey || appKey !== serverAppKey) {
        return resp.status(403).json({
            status: 1002,
            clientMessage: !serverAppKey ? m.NFNDAPK_SERVER_MSJ : m.BADAPPK_ERR_MSJ
        });
    }

    const queryStatement = `select id, role_id as "roleId", name as "fullName", password from auth.user_auth($1);`;
    db.query(queryStatement, [user])
        .then(dbData => {
            if (dbData.rows.length > 0) {
                const { id, roleId, fullName, password } = dbData.rows[0];
                if (password) {
                    // Evaluates database password with the client sent password.
                    if (compareSync(formPassword, password)) {

                        // Bulk token parameters
                        const tknPayload = {
                            id,
                            roleId,
                            fullName
                        }, tknSignOptions = {
                            expiresIn: '15m'
                        };

                        const token = sign(tknPayload, process.env.TOKEN_SECRET_KEY, tknSignOptions)
                        return resp.status(200).json({
                            status: 1000,
                            clientMessage: m.WLCM_CLIENT_MSJ,
                            token
                        });
                    }
                }
            }

            return resp.status(403).json({
                status: 1009,
                clientMessage: m.FRBDN_ERR_MSJ
            });
        }).catch(error => {
            return resp.status(400).json({
                status: 1003,
                dbError: error.stack,
                clientMessage: m.DBCLIENT_ERR_MSJ})
            });

});

module.exports = router;