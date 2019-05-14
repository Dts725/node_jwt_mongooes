let Mongooes = require('mongoose')
const db = require('../config/db_fetch')
let Schema = Mongooes.Schema;


// 初始化模板
module.exports = function()  {
    

        let log = new Schema({
            name: String,
            data: String,
            date : String
            // date: {
            //     type: Date,
            //     default: Date.now
            // },
            // dsc: {
            //     fav: String,
            //     tal: String,
            // }
        })


        //实例化模板
        return db.log('admin').model('log', log)
    
}