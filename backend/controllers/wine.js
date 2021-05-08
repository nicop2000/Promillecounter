const Wine = require('../model/wine');
const auth = require('../helpers/authenticateAsUser')

const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect('mongodb://localhost:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const addWine = async (req, res) => {
    console.log("Angekommen")
    const {token, wine: newWine} = req.body;
    console.log
    console.log(req.body)

    const userAuth = auth.verifyJWT(token)
    if(!userAuth.auth) {
        return
    }

    try{

        const userId = userAuth.id;
        console.log(userAuth.id);
        console.log(userId, newWine);
        const list = await Wine.findOne({userId}).lean();
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
        res.json({status: 'ok', data: 'Änderung erfolgreich'});
    } catch (error) {
        console.log('ERRRROOOORRRR', error);
        //alert('Etwas ist schiefgelaufen. Bitte logge dich aus und wieder ein')
        return res.json({status: 'error', error: 'Token ungültig'})
    }
}

module.exports = {addWine}