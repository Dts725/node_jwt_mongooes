let jwt = require('jsonwebtoken')

let o = {
    jwt: (user, pwt) => {
        let token = jwt.sign({
            iss: 'auth',
            sub: 'test',
            user: user,
            pwt: pwt
        }, '9528', {
            expiresIn: 60 * 60
        })
    }
}