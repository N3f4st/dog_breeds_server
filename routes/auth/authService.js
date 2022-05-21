const authDal = require('./authDal')
const m = require('../../message_constants');
const { compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken')

const authService = {
    sign: async(body, resp) => {

        if (!body.user || !body.password || !body.appKey) {
            return resp.status(400).send(m.MLFRMD_ERR_MSJ);
        }
        const user = body.user,
              formPassword = body.password,
              appKey = body.appKey,
              serverAppKey = process.env.APPKEY;
    
        // check for false application key validity
        if (!serverAppKey || appKey !== serverAppKey) {
            return resp.status(403).json({
                status: 1002,
                clientMessage: !serverAppKey ? m.NFNDAPK_SERVER_MSJ : m.BADAPPK_ERR_MSJ
            });
        }

        const queryResult = await authDal.sign(user);

        // if there is an error...
        if (queryResult.message) 
            return resp.status(400).json({
                status: 1003,
                dbError: queryResult.message,
                clientMessage: m.DBCLIENT_ERR_MSJ
            });
        
        if (queryResult.rows.length > 0) {
            const { id, roleId, fullName, password } = queryResult.rows[0];

            // Evaluates database password with the client sent password using bcrypt.
            if (compareSync(formPassword, password)) {
                // Bulk token parameters
                const tknPayload = {
                    id,
                    roleId,
                    fullName
                }, tknSignOptions = {
                    expiresIn: '15m'
                };

                // generates token and retrieve
                const token = sign(tknPayload, process.env.TOKEN_SECRET_KEY, tknSignOptions)
                return resp.status(200).json({
                    status: 1000,
                    clientMessage: m.WLCM_CLIENT_MSJ,
                    token
                });
            }
        } 

        // user doesn't exist.
        return resp.status(403).json({
            status: 1009,
            clientMessage: m.FRBDN_ERR_MSJ
        });
    }
}

module.exports = authService;