var express = require('express');
var router = express.Router();
let login = require('../src/web/web_login')
let helloWord = require('../src/web/web_helloWord')
let jwt = require('../jwt/json_web_token')
/* GET users listing. */
// hello word

// 登录 注册 接口
router.all('/login', login)

// 中间件jwt 验证
router.use(jwt.verify);
router.all('/hello_word', helloWord);

module.exports = router;