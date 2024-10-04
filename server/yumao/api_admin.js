import express from 'express'
import tool from './tool'
import config from './config'
import path from 'path'
import fs_extra from 'fs-extra'
let { upload, imgUrl } = config
let route = express.Router()

// fs_extra.moveSync(imgUrl + oldUrl, imgUrl + newUrl, { overwrite: true })
// fs_extra.removeSync(imgUrl + swiper_data[0].img)

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