const jwt = require('jsonwebtoken')
const config = require('config');
//function that has access to the response and request
module.exports = function (req, res, next){
    const token = req.header('x-auth-token');

    //check if no token
    if(!token)
    {
        return res.status((401).json({msg: 'No token, Authorization denied'}));

    }

    //verify token
    try{
        const decoded  = jwt.verify(token, config.get('JWT_KEY'));

        req.user = decoded.user;
        next();
    }
    catch(error)
    {
        res, status(401).json({msg:'token is not valid'});
    }

};
