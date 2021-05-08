const path = require("path")

login = function (req, res, next) {
    res.sendFile(path.join(__dirname + "/../static/login.html"));
}