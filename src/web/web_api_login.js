const db = require('../../db/model/db_login')
async function login(req, res) {
    let method = req.method;

    switch (method) {
        case 'POST':
            
            {
                let data = {
                    user : req.body.user,
                    pwd : req.body.pwd
                };
                let ress = await db.query(data);
                res.send(ress);
                break;
            }
        case 'PUT':
            {
                let data = {
                    user: req.body.user,
                    pwd: req.body.pwd
                };
                let ress = await db.save(data, data);
                res.send(ress);
                break;
            }
        default:
            break;
    }
}

module.exports=login;