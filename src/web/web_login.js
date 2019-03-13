const db = require('../../db/model/db_login')
let jwt = require('../../jwt/json_web_token')
async function login(req, res) {
    let method = req.method;

    switch (method) {
        case 'POST':

            {

                let user = req.body.user;
                let pwd = req.body.pwd;

             let token =   jwt.sign(user, pwd);
                let data = {
                    user: user,
                    pwd: pwd,
                };
                let ress = await db.query(data);

                ress = new res_status(ress)

                let dat = {
                    msg : '登录成功',
                    token : token
                }
                res.send(new res_status(dat,0));
                break;
            }
        case 'PUT':
            {
                let data = {
                    user: req.body.user,
                    pwd: req.body.pwd
                };

                // 查询 是否注册
                let ress = await db.query(data, data);

                if (ress.length) {
                    let msg = {
                        msg: "用户名已存在 ! ! !",
                    }
                    res.send(new res_status(msg, 1))
                } else {

                    // 数据库插入
                   
                    await db.save(data);
                    let msg = {
                        msg: "注册成功",
                        code: 0,
                    }
                    res.send(new res_status(msg, 0))

                }

                break;
            }
        default:
            break;
    }
}

module.exports = login;