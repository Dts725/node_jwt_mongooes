var express = require('express');
var router = express.Router();

let log = require('../src/servie/servie_log.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// post 方法
router.all('/log',log);
module.exports = router;
