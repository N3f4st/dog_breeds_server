const jwt = require('jsonwebtoken');

 /**
 * Evaluates the header's authorization token.
 * @param {Object} req - http request from client.
 * @param {Object} resp - server response.
 * @param {function} done - "next" function invoked on controller.
 */
const authToken = (req, resp, done) => {
    const reqHeaders = req.headers['authorization'];
    if (!reqHeaders) return resp.sendStatus(403); // Forbidden

    const token = reqHeaders && reqHeaders.split(' ')[1];
    if (token == null || token == undefined ) return resp.sendStatus(403); // Forbidden

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, sobre) => {
        if (err) return resp.sendStatus(401); // Unauthorized
        
        done();
    });
}

module.exports = { authToken };