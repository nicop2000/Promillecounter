const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./backend/routes/index.js');
const cors = require('cors');
require('dotenv').config()
const upload = require('express-fileupload')
const https = require('https');
const http = require('https');
const app = express();

const PORT = process.env.PORT || 5000;


if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/alkobase.de/privkey.pem', 'utf-8');
    const certificate = fs.readFileSync('/etc/letsencrypt/live/alkobase.de/cert.pem', 'utf-8');
    const ca = fs.readFileSync('/etc/letsencrypt/live/alkobase.de/chain.pem', 'utf-8');
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

https.createServer(credentials, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
http.createServer(function (req, res) {
    res.writeHead(301, {"Location": "https://" + req.headers['host'] + req.url});
    res.end();
}).listen(80);
} else
if (process.env.NODE_ENV === "development") {
    app.listen(9000);
} else {
    app.listen(9000);
}



app.use(bodyParser.json());
app.use(upload());
app.use(express.static(__dirname + "/static/"));
app.use('/resources', express.static(__dirname + '/backend/helpers'));
app.use('/', router);
app.use(cors());

app.listen(PORT, () => {
    console.log('Server up at ', PORT);
});




