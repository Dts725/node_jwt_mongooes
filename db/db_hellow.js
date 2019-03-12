let schema = require('./tool/db_schema')
module.exports = {
    // 新增接口
    save: async (data) => {
        let admin = schema.userSchema();
        let user = new admin(data);
        await user.save();
        
    },
    // 删除
    delete : async (data) => {
        let admin = schema.userSchema();
        let user = new admin(data);
        
    }

    // 修改

    // 查看

}