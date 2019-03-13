let schema = require('../schema/db_schema')
module.exports = {
    // 新增接口
    save:  (data) => {
        let admin = schema.userSchema();
        let user = new admin(data).save();
        // let res =  user.save();
        return user;
    },
    // 删除
    delete:  (ol,nw) => {
        let admin = schema.userSchema().findOneAndDelete(ol, nw);
        
        // let res = admin.findOneAndDelete(ol,nw);
        return admin
    },

    // 修改
    update:  (ol,nw) => {
        let admin = schema.userSchema().findOneAndUpdate(ol, nw);
    
        // let res = admin.findOneAndUpdate(ol,nw);
        return admin
    },

    // 查看
    query:  (data) => {
        let admin = schema.userSchema().find(data);
        // let res = admin.find(data);
        return admin
    }

}