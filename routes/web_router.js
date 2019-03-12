var express = require('express');
var router = express.Router();
let helloWord = require('../src/web_api_helloWord')

/* GET users listing. */
router.get('/hello_word', helloWord);

module.exports = router;