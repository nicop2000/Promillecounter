const express = require('express');
const router = express.Router();
const user = require('./user');
const wine = require('./wine');
const path = require('path');

router.use('/api/user', user);
router.use('/api/wine', wine);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/index.html"));
});

router.get('/cp', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/change-password.html"));
})

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/login.html"));
})
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/register.html"));
})
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/about.html"));
})
router.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/account.html"));
})
router.get('/add-wine', (req, res) => {
    res.sendFile(path.join(__dirname + "/../../static/add-wine.html"));
})

module.exports = router;