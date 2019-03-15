let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let servie_router = require('./routes/servie_router');
let web_router = require('./routes/web_router');
let res_status = require('./bin/config')
let cors = require('cors')
let history = require('connect-history-api-fallback');
let app = express();

// 全局返回状态态配置
global.res_status = res_status.res_status;
global.jwt_key = res_status.jwt_key;
global.jwt_auth = res_status.jwt_auth;
// 配置跨域
app.use(cors())

// 兼容 vue  wpa 
app.use(history())
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// 中间件解析 post 请求参数
app.use(bodyParser.json()); // for parsing application/json

app.use(express.json());

// 中间件解析 url
app.use(express.urlencoded({
  extended: false
}));

// cookie 中间件
app.use(cookieParser());

// 静态资源托管
app.use(express.static(path.join(__dirname, 'public')));

// 中间件拦截路由
app.use('/service', servie_router);
app.use('/web', web_router);

// catch 404 and forward to error handler
//中间价报错
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler

// 中间件内部报错
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;