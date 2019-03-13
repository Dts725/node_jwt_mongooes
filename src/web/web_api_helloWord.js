const user = require('../../db/model/db_hellow')

async function fn(req, res, next) {
    let method = req.method;

    switch (method) {
        // 查询
        case 'GET':
            {
                let data = {
                    name: req.query.add
                }
                let _res = await user.query(data);
                _res = new res_status(_res)
                res.send(_res)
                break;
            };
            // 新增
        case "POST":
            {

                let data = {
                    name: req.body.add,
                    age: req.body.id
                }
                let _res = await user.save(data);

                _res = new res_status(_res);
                res.send(_res)
                break;
            };
            // 修改
        case "PUT":
            {
                let ol = {
                    age: req.body.age
                }
                let nw = {
                    name: req.body.replace
                }
                let _res = await user.update(ol, nw)
                // console.dir(_res)
                res.send(_res);
                break;
            };
            // 删除
        case "DELETE":
            {

                let ol = {
                    age: req.body.age
                }
                let nw = {
                    name: req.body.replace
                }
                let _res = await user.delete(ol, nw)
                    // _res =  new res_status(_res);
                res.send(_res);
                break;
            };
        default:
            {
                break;
            }
    }

}
module.exports = fn;