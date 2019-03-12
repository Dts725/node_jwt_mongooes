const user = require('../db/db_hellow')

function fn(req, res, next) {

    let data = req.query.id
    user.save();
    res.send('哈哈哈哈')
}
module.exports = fn;