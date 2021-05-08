const jwt = require('jsonwebtoken');

const verifyJWT = (token) =>  {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return {auth: true, user};
    } catch (error) {
        alert('Nicht autorisiert')
        return {auth: false};
    }
}

module.exports = {verifyJWT};

