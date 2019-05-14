let db = require('../../db/model/db_model_log')



 function fn(req, res, next) {

    let method = req.method
    console.log('日志进来了')
    console.log(req.method)
    switch (method) {
        // 新增日志
        case "POST":
        {
            let data = {
                name: req.body.name,
                data: req.body.data,
                date: req.body.date
            }

            db.save(data);
            res.end("0")
            break;
        }

        // 查询日志
        case "GET":

        {
            let data = {
                name: req.query.name,
                date: req.body.date
            }

          db.query(data);
            res.end("0")
            break;
        }





        default:
            break;
    }

}

module.exports = fn