import nodemailer from 'nodemailer'
import multer from 'multer'
import mysql from 'mysql2'
import path from 'path'

let upload = multer({
    dest: process.env.multer_images_dir, //这个目录相对于项目文件中node_modules 
    limits: {
        files: 9,
        fields: 10,
        fileSize: 10.5 * 1024 * 1024
    }
}).array('files', 9)

let alipay = {
    id: process.env.alipay_appId,
    privateKey: process.env.alipay_privateKey,
    publicKey: process.env.alipay_publicKey,
}

let token_secret = process.env.json_web_token

let mail = nodemailer.createTransport({
    host: process.env.stmp_host,
    port: process.env.stmp_port,
    secure: true,
    auth: {
        user: process.env.stmp_user,
        pass: process.env.stmp_pass,
    },
});

let dbConfig = {
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
}

let db = mysql.createConnection(dbConfig).query('select 1', (err, r) => { if (err) console.log('数据库配置错误！根目录文件:.env.production 和 .env.development 文件'); else console.log('数据库成功链接！'); })

let __dirname = path.resolve()
let imgUrl = __dirname + process.env.file_images_dir
let fontUrl = __dirname + process.env.file_fonts_dir


console.log('现在环境是:'+process.env.NODE_ENV,'数据库远程地址:'+ process.env.db_host,'图片地址为:'+imgUrl);

export default {
    token_secret,
    dbConfig,
    fontUrl,
    imgUrl,
    alipay,
    upload,
    mail,
    db,
}