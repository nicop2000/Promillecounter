const express = require('express');
const router = express.Router();
const user = require('./user');
const wine = require('./wine');
const path = require('path');
const auth = require('./../middleware/authenticateAsUser')

router.use('/api/user', user);
router.use('/api/wine', wine);



router.get('/',  (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/index.html"));
});

router.get('/home', (req, res, next) => {
    res.redirect('/')
})


router.get('/cp', [auth.verifyJWT], (req, res, next) => {

    res.sendFile(path.join(__dirname + "/../../static/change-password.html"));
})

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/login.html"));
})
router.get('/register', (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/register.html"));
})
router.get('/about', (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/about.html"));
})
router.get('/account',[auth.verifyJWT], (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/account.html"));
})
router.get('/add-wine', [auth.verifyJWT], (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/add-wine.html"));
})
router.get('/show-wine', [auth.verifyJWT], (req, res, next) => {
    res.sendFile(path.join(__dirname + "/../../static/show-wine.html"));
})

router.get('*',  (req, res, next) => {
    res.redirect('/')
});


module.exports = router;