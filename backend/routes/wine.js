const express = require('express');
const router = express.Router();
const wine = require('../controllers/wine');
const multer = require('multer');
const upload = multer({dest: '../uploads/'});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// })
// const upload = multer({storage: storage});

console.log("routes/wine")
router.post('/addWine', wine.addWine);
router.post('/showWine', wine.showWine);
router.post('/uploadImage', wine.uploadImage);


module.exports = router;