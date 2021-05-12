const express = require('express');
const router = express.Router();
const wine = require('../controllers/wine');

console.log("routes/wine")
router.post('/addWine', wine.addWine);
router.post('/showWine', wine.showWine);


module.exports = router;