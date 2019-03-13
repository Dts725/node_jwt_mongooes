let session = require('express-session')

const url =  {
  // 数据库地址
  db_url :  'mongodb://47.100.55.117:27017/',

  // response  样式 
  res_status: function (data, code = 0 ,status = 200 ) {
      this.data = data;
      this.status = status,
      this.code= code
  
  },
  jwt_key : '9528',
  jwt_auth : 'auth'

}

module.exports = url