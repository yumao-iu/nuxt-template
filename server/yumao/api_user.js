import express from 'express'
import tool from './tool'
let route = express.Router()

//接口中间件
route.use((req, res, next) => {
    let user_token = req.headers.authorization
    let user_data = tool.check_token(user_token)
    if (user_data != null) {
        req.user_id = user_data.id
        req.body.uid = user_data.id
        req.user_user = user_data.user
        next()
    } else res.send({ msg: '访客未登录🤡 ！', code: 500 })
})


export default route