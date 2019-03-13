let jwt = require('jsonwebtoken')
let j_k= require('../bin/config')

let key = j_k.jwt_key
let auth = j_k.jwt_auth

let o = {
    sign: (user, pwd) => {
        let token = jwt.sign({
            issuer: auth,
            sub: 'test',
            user: user,
            pwt: pwd
        }, key, {
            expiresIn: 60 * 60
        })

        return token
    },
    verify:(req, res, next) => {
            let token = req.body.token;

            jwt.verify(token, jwt_key, (err, decode) => {
                if (err) {
                    res.send(new res_status({
                        msg: 'token失效'
                    }, 2))
                } else {
                    next()
                }
            })
        }
}


module.exports = o