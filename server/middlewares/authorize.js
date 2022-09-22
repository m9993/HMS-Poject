const jwt = require('jsonwebtoken');
const { secret } = require('../config/config.json');
const model = require('../models');

module.exports = authorize;

function authorize(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                const errorInfo = { ...err }
                if (errorInfo.name == 'TokenExpiredError')
                    return res.status(401).json({ success: false, message: 'Token expired' });

                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }

            req.user = await model.User.findByPk(decoded.sub);
            // req.tokenInfo = { token, expiredAt: new Date(decoded.exp * 1000).toISOString() };
            next()
        });
    } else {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}