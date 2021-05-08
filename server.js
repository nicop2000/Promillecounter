const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./backend/routes/index.js');
const cors = require('cors');
require('dotenv').config()

const PORT = process.env.PORT || 5000;



const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static/"));
app.use('/resources',express.static(__dirname + '/backend/helpers'));
app.use('/', router);
app.use(cors());

app.listen(PORT, () => {
    console.log('Server up at ', PORT);
});




