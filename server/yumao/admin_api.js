import express from 'express'
import tool from './tool'
import config from './config'
import path from 'path'

let route = express.Router()
let __dirname = path.resolve()
let imgUrl = ''
console.log(process.env.NODE_ENV, __dirname);
if (process.env.NODE_ENV == 'development') imgUrl = __dirname + '/public/images/'
else imgUrl = __dirname + '/.output/public/images/'

//接口中间件
route.use((req, res, next) => {
    let admin_token = req.headers.authorization
    let admin_data = tool.check_token(admin_token)
    if (admin_data != null) {
        req.body.admin_id = admin_data.id
        req.admin_id = admin_data.id
        req.user = admin_data.user
        req.power = admin_data.power
        next()
    }
})



export default route