let db = require('../config/db_fetch')
let mos = require('mongoose')
let schema = mos.Schema;
function fn () {
    let login = new schema({
        user : String,
        pwd: String,
        id : String,
        date: {
            type: Date,
            default: Date.now
        },
    })

    return db.mongoose('admin').model('login',login);
}
module.exports=fn;