const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const { secret } = require('config.json');
const Role = require('../_helpers/role');

module.exports = authorize;

function authorize(roles = []) {

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),
        // authorize based on user role
        async (req, res, next) => {
            console.log(req.headers)
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
            if (token.startsWith('Bearer ')) {
              // Remove Bearer from string
              token = token.slice(7, token.length);
            }
            console.log(token)
            if (token) {
                await jwt.verify(token, secret, (err, decoded) => {
                  if (err) {
                    return res.json({
                      success: false,
                      message: 'Token is not valid'
                    });
                  } else {
                    
                    const {role} = decoded;
                    console.log(decoded);
                    console.log(role)
                    if (role !== Role.Admin) {
                        // user's role is not authorized
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
                    
                    next();
                  }
                });
              } else {
                return res.json({
                  success: false,
                  message: 'Auth token is not supplied'
                });
              }

            // authentication and authorization successful
           
        }
    ];
}