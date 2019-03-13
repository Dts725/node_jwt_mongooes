let session = require('express-session')

const url =  {
  // 数据库地址
  db_url :  'mongodb://47.100.55.117:27017/',

  // response  样式 
  res_status :function (data,status = 200,code = 0)  {
      this.data = data;
      this.status = status,
      this.code= code
  
  }

}

module.exports = url