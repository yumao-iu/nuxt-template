import nodemailer from 'nodemailer'
import multer from 'multer'
import mysql from 'mysql2'
import path from 'path'

let __dirname = path.resolve()
let imgUrl: string = __dirname + '/public/images/'
let fontUrl: string = __dirname + '/public/fonts/'
let multer_dest: string = './public/images'
let token_secret: string = 'hl'
let alipay_config = {
    id: <string>'1',
    privateKey: <string>'2',
    publicKey: <string>'3',
}
let mail_config = {
    host: <string>'1',
    port: <string>'465',
    secure: true,
    auth: {
        user: <string>'123',
        pass: <string>'123',
    },
}
let dbConfig = {
    host: <string>'127.0.0.1',
    user: <string>'root',
    password: <string>'123456',
    database: <string>'bs',
}
if (process.env.NODE_ENV == 'production') {
    imgUrl = __dirname + '/output/public/images/'
    fontUrl = __dirname + '/output/public/fonts/'
    multer_dest = '.output/public/images'
    token_secret = 'hl'
    alipay_config = {
        id: '1',
        privateKey: '2',
        publicKey: '3',
    }
    mail_config = {
        host: '1',
        port: '465',
        secure: true,
        auth: {
            user: '123',
            pass: '123',
        },
    }
    dbConfig = {
        host: 'hl.sb',
        user: 'root',
        password: '123456',
        database: 'bs',
    }
}

let upload = multer({
    dest: multer_dest, //这个目录相对于项目文件中node_modules 
    limits: {
        files: 9,
        fields: 10,
        fileSize: 10.5 * 1024 * 1024
    }
}).array('files', 9)

let db = mysql.createConnection(dbConfig)
db.query('select 1', (err, r) => { console.log('现在环境是:' + process.env.NODE_ENV, '数据库远程地址:' + dbConfig.host, '图片地址为:' + imgUrl); if (err) console.log('数据库配置错误！但不影响运行'); else console.log('数据库成功链接！'); })



export default {
    token_secret,
    dbConfig,
    fontUrl,
    imgUrl,
    upload,
    alipay_config,
    mail_config,
    db,
}
