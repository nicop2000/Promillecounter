mongo
use alkobase
db.createUser(
  {
    user: "alkobaseAdmin",
    pwd: "alkobaseAdminPass", // or cleartext password
    roles: ["readWrite", "dbAdmin"]
  }
)
db.createCollection('users')
db.createCollection('wine')
