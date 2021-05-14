let jwt = require('jsonwebtoken');


function verifyJWT(req, res, next) {
    console.log("JWT-AUTH\n\n\n")
    console.log('Header: ', req.headers.cookie);
    if(req.headers.cookie === undefined) {
        res.redirect('/')

        // res.json({status: 'errorNoCookies'})
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

    if (!token) return res.status(401).redirect('/')

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        console.log('verfied')
        req.user = verified
        res.cookie('loggedIn', true);
        next();
    } catch (error) {
        res.cookie('loggedIn', false);
        res.status(401).redirect('/')
    }
}


module.exports = {
    verifyJWT
}

