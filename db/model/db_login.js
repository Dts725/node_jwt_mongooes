const schema = require('../schema/db_login');
let o ={
    save : (data) => {
        console.log(data)
        let n = schema()
        let login = new n(data).save();
       
        return login;
    },

    query : (data) => {
       
        let login = new schema().find(data);
        return login;
    }

}

module.exports = o;