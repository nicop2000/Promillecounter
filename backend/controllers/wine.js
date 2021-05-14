const Wine = require('../model/wine');
const auth = require('../middleware/authenticateAsUser')
const jwt = require('jsonwebtoken')
const upload = require('express-fileupload')

const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect('mongodb://localhost:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const addWine = async (req, res) => {
    console.log("Angekommen")
    const {wine: newWine} = req.body;
    console.log
    console.log(req.body)
    if(req.headers.cookie === undefined) {
        res.json({status: 'errorNoCookies'})
        return;
    }
    const tokenTempAll = req.headers.cookie.split('=')
    let tokenTemp = []
    let token = ""
    tokenTempAll.forEach(element => {
        let temp = element.split(';')
        temp.forEach(element => {
            tokenTemp.push(element)
        })
    })
    console.log(tokenTemp)
    for (let i = 0; i < tokenTemp.length; i++) {
        console.log('aktuelles i', tokenTemp[i])
        if (tokenTemp[i].trim() === 'myToken') {
            console.log('FOUND')
            console.log(tokenTemp[i])
            console.log(tokenTemp[i + 1])
            token = tokenTemp[i + 1];
            break;
        }
    }
    console.log('TOKEN', token)

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const userId = user.id; //token holen
        console.log(userId);
        console.log(userId, newWine);
        const list = await Wine.findOne({userId}).lean();
        console.log(list, 'GEFUNDENER WEIN LIST')
        if (!list) {
            console.log('NEW LIST')
            const respone = await Wine.create({
                userId,
                wine: newWine
            })
            console.log('Created new wine list')
            console.log(respone)
        } else {
            let wine = list.wine;
            wine.push(newWine);
            console.log(wine)
            console.log(list)
            await Wine.updateOne(
                {userId},
                {
                    $set: {wine}
                }
            )
        }
        res.json({status: 'ok', data: 'Änderung erfolgreich', wine: newWine});
    } catch (error) {
        console.log('ERRRROOOORRRR', error);
        //alert('Etwas ist schiefgelaufen. Bitte logge dich aus und wieder ein')
        return res.json({status: 'error', error: 'Token ungültig'})
    }
}

const showWine = async (req, res) => {
    console.log("AngekommenShow")
    if(req.headers.cookie === undefined) {
        res.json({status: 'errorNoCookies'})
        return;
    }

    const tokenTempAll = req.headers.cookie.split('=')
    let tokenTemp = []
    let token = ""
    tokenTempAll.forEach(element => {
        let temp = element.split(';')
        temp.forEach(element => {
            tokenTemp.push(element)
        })
    })
    console.log(tokenTemp)
    for (let i = 0; i < tokenTemp.length; i++) {
        console.log('aktuelles i', i)
        if (tokenTemp[i].trim() === 'myToken') {
            console.log('FOUND')
            console.log(tokenTemp[i])
            console.log(tokenTemp[i + 1])
            token = tokenTemp[i + 1];
            break;
        }
    }
    console.log('TOKEN', token)

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET)
        console.log('verified show wine')
        const userId = user.id; //token holen
        console.log(userId);

        const list = await Wine.findOne({userId}).lean();
        if (list) {
            console.log('LISTE', list)

            res.json({status: 'ok', data: list.wine});
        } else {
            return res.json({status: 'okBut', data: 'none', error: 'Noch keine Weine vorhanden'})
        }

    } catch (error) {
        console.log('ERRRROOOORRRR', error);
        //alert('Etwas ist schiefgelaufen. Bitte logge dich aus und wieder ein')
        return res.json({status: 'error', error: error})
    }
}

const uploadImage =  (req, res) => {
    console.log('Angekommen uploadImage')
    if (req.files) {
        console.log(req.files);
        let file = req.files.file;
        let filename = file.name + new Date().toISOString();
        console.log(filename);
        file.mv('./static/uploads/' + filename, function (err) {
            if (err) {
                res.json(err)

            } else {
                res.json({status: 'ok', data: 'Bild erfolgreich hochgeladen', path: './uploads/' + filename});
            }
        })
    } else {
        res.json({status: 'ok', data: 'Kein Bild hochgeladen, da keins angehängt wurde'});

    }
}

const deleteWine = async (req, res) => {
    const {wineToDelete} = req.body;
    console.log
    console.log(req.body)
    if(req.headers.cookie === undefined) {
        res.json({status: 'errorNoCookies'})
        return;
    }
    const tokenTempAll = req.headers.cookie.split('=')
    let tokenTemp = []
    let token = ""
    tokenTempAll.forEach(element => {
        let temp = element.split(';')
        temp.forEach(element => {
            tokenTemp.push(element)
        })
    })
    console.log(tokenTemp)
    for (let i = 0; i < tokenTemp.length; i++) {
        console.log('aktuelles i', tokenTemp[i])
        if (tokenTemp[i].trim() === 'myToken') {
            console.log('FOUND')
            console.log(tokenTemp[i])
            console.log(tokenTemp[i + 1])
            token = tokenTemp[i + 1];
            break;
        }
    }
    console.log('TOKEN', token)

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const userId = user.id; //token holen
        console.log(userId);
        console.log(userId, wineToDelete);
        const list = await Wine.findOne({userId}).lean();

            let wine = list.wine;
            console.log(wine)
            let wineName = '';
            wine.forEach(function(item, index, object) {
                if(item._id == wineToDelete) {
                    wineName = item.name;
                    console.log('FOUND')
                    object.splice(index, 1);
                }
            })
            console.log(wine)
            //
            // console.log('\n\n\n')
            // console.log(list)
            await Wine.updateOne(
                {userId},
                {
                    $set: {wine}
                }
            )

        res.json({status: 'ok', data: 'Wein erfolgreich gelöscht', wine: wineName});
    } catch (error) {
        console.log('ERRRROOOORRRR', error);
        //alert('Etwas ist schiefgelaufen. Bitte logge dich aus und wieder ein')
        return res.json({status: 'error', error: 'Token ungültig'})
    }
}

module.exports = {addWine, showWine, uploadImage, deleteWine}