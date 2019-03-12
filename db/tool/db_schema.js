let Mongooes = require('mongoose')
const db = require('./db_fetch')
let Schema = Mongooes.Schema;



module.exports = {
   userSchema : () => {
        
     let  fav = new Schema({
           name: String,
           age: Number,
           date: {
               type: Date,
               default: Date.now
           },
           dsc: {
               fav: String,
               tal: String,
           }
       })

       
     return db.mongoose('admin').model('fav', fav)
   }}