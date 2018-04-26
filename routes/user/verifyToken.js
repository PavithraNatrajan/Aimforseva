var jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, global.config.secret, function(err, decoded) {
            if (err) { //failed verification.
                return res.json({
                    "error": true
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(403).send({
            "error": true
        });
    }
}