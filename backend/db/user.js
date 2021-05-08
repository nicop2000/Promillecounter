let mongoUtil = require("./mongoUtil");


createUser = function (userObj, callback){
    let db = mongoUtil.getDb();
    if (db) {
        try {
                db.collection("users").insertOne(userObj, callback);
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

findUser = async function (username) {
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let user = await db.collection("users").find({ "username": username}).toArray();
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}


getCart = async function(userID){
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let user = await db.collection("users").findOne({ "id": userID});
            let cart = user.cart;
            return cart;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}


addToCart = async function (userID, cartArr){
    let db = mongoUtil.getDb();
    if (db) {
        try {
            await db.collection("users").updateOne({ "id": userID}, {$set:{cart: cartArr}});
            return {"result":"success"};
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}

module.exports= {
    createUser,
    findUser,
    addToCart,
    getCart
}