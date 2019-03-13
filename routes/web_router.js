var express = require('express');
var router = express.Router();
let login = require('../src/web/web_api_login')
let helloWord = require('../src/web/web_api_helloWord')

/* GET users listing. */
// hello word
router.all('/hello_word', helloWord);

// 登录 注册 接口
router.all('/login',login)

module.exports = router;