let schema = require('../schema/db_login');
let o ={
    save : (ol,nw) => {
        let login = new schema().findOneAndUpdate(ol,nw);
       
        return login;
    },

    query : (data) => {
        let login = new schema().find(data);
        return login;
    }

}

module.exports = o;