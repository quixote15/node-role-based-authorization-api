const config = require('config.json');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    authenticate,
};

async function authenticate({ username, password }) {
    console.log(username )
    const user = await User.findOne({username, password});
    console.log(user)
    if (user) {
        const token = jwt.sign(
            { sub: user._id, role: user.role },
            config.secret,
            { expiresIn: '24h'} // expires in 24 hours
    );
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}
