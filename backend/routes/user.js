const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

console.log("routes/users")

router.post('/change-password', user.changePassword);
router.post('/login', user.login);
router.post('/register', user.register);


module.exports = router;