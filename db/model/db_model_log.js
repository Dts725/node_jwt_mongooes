const schema = require('../schema/db_schema_log');

// 数据层逻辑
let o = {
    save: (data) => {
        let n = schema()
        let log = new n(data).save();

        return log;
    },

    query: (data) => {

        let log = new schema().find(data);
        return log;
    }

}

module.exports = o;