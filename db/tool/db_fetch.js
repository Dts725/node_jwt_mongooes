const Mongoose = require('mongoose')

let url = require('../../bin/config')
module.exports = {
    mongoose: (col, options = {
        useNewUrlParser: true,
        auth: {
            user: 'admin',
            password: 'abc123'
        }
    }) => {
      return Mongoose.createConnection(`${url.db_url + col}`, options)
    }
}