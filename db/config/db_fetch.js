const Mongoose = require('mongoose')

let url = require('../../bin/config')
module.exports = {
    mongoose: (col, options = {
        useNewUrlParser: true,
        poolSize: 4, //连接池大大小
        auth: {
            user: 'admin',
            password: 'abc123'
        }
    }) => {
      return Mongoose.createConnection(`${url.db_url + col}`, options)
    },
    log: (col, options = {
        useNewUrlParser: true,
        poolSize: 4, //连接池大大小
        auth: {
            user: 'admin',
            password: 'abc123'
        }
    }) => {
      return Mongoose.createConnection(`${url.db_url + col}`, options)
    }
}
// 每个表配置一个连接  或者自定义连接