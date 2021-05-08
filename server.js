const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./model/user');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const app = express();
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});

app.use(bodyParser.json());
app.use(express.static(__dirname + "/static/"));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/login.html"));
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/register.html"));
})
app.get('/cp', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/change-password.html"));
})
app.post('/api/change-password', async (req, res) => {
    const {token, passwordNew: plainTextPassword} = req.body;
    console.log(req.body);
    console.log(plainTextPassword, typeof plainTextPassword);
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Passwort nicht gültig'})
    }
    //TODO: plainTextPasswordcheck with RegEx
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const _id = user.id;
        const password = await bcrypt.hash(plainTextPassword, 10);
        await User.updateOne(
            {_id},
            {
                $set: {password}
            }
        )
        res.json({status: 'ok', data: 'Änderung erfolgreich'});
    } catch (error) {
        console.log(JSON.stringify(error));
        alert('Etwas ist schiefgelaufen. Bitte logge dich aus und wieder ein')
        return res.json({status: 'error', error: 'Token ungültig'})
    }

    console.log('JWT decoded: ', user);
    res.json({status: 'ok'});
})


app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).lean()

    if (!user) {
        return res.json({status: 'error', error: 'Benutzername oder Passwort falsch'});
    }

    if (await bcrypt.compare(password, user.password)) {
        //the username/password-combo is valid
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET)
        return res.json({status: 'ok', data: token});
    }

    return res.json({status: 'error', error: 'Benutzername oder Passwort falsch'});


})

app.post('/api/register', async (req, res) => {
    const {username, password: plainTextPassword} = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Username nicht gültig'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Passwort nicht gültig'})
    }
    //TODO: plainTextPasswordcheck with RegEx

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response);
    } catch (error) {
        if (error.code === 11000) {
            //duplicate key/username
            return res.json({status: 'error', error: 'Username already in use'});
        }
        console.log(JSON.stringify(error));
        throw error
    }
    res.json({status: 'ok'})
})

app.listen(PORT, () => {
    console.log('Server up at ', PORT);
});




