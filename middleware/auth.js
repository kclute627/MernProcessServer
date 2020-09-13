const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get token from header

    const token = req.header('x-auth-token');
    


    // check if no token

    if(!token) {
        console.error('no token')
        return res.status(401).json({msg: 'no token, auth denied'})

    }
    // verify token if there is one 
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.id;
        console.log(req.user, 'req.user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        next()
    } catch (err) {
        console.log('token not valid', token)
        res.status(401).json({msg: 'token is not valid'})
    }
}