const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const register = async (req, res) => {
    const {firstName, lastName, username, emailAddress, password: plainTextPassword, created} = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Username nicht gültig'})
    }
    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Passwort nicht gültig'})
    }
    //TODO: plainTextPasswordcheck with RegEx

    console.log('start hash')
    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await User.create({
            firstName,
            lastName,
            username,
            emailAddress,
            password,
            created
        })
        console.log(response)
            const token = jwt.sign({id: response._id, username: response.username}, process.env.JWT_SECRET, {expiresIn: '12h'})
            res.cookie('myToken', token);
            res.cookie('loggedIn', true);

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
}

const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username}).lean()


    if (!user) {
        return res.json({status: 'error', error: 'Benutzername oder Passwort falsch'});
    }

    if (await bcrypt.compare(password, user.password)) {
        //the username/password-combo is valid
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '12h'})
        res.cookie('myToken', token);
        res.cookie('loggedIn', 'true');

        return res.json({status: 'ok', data: token});
    }

    return res.json({status: 'error', error: 'Benutzername oder Passwort falsch'});


}


const logout = async (req, res) => {
    console.log('CLICKED LOGOUT');
    res.cookie('myToken', 'loggedOut');
    res.cookie('loggedIn', false);
    return res.redirect('/');
}

const changePassword = async (req, res) => {
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
}

module.exports = {register, login, logout, changePassword} //is available with require in routes/user.js