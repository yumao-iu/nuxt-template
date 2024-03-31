import AlipaySdk from "alipay-sdk";
import jwt from 'jsonwebtoken'
import config from "./config"
import moment from "moment";
import multer from 'multer'

let { db, token_secret, mail,upload } = config

const alipaySdk = new AlipaySdk({
    appId: config.alipay.id,
    privateKey: config.alipay.privateKey,
    alipayPublicKey: config.alipay.publicKey
});

export default {
    //上传文件中间件
    upload,
    //生成token
    set_token(obj, time = 3600) {
        return jwt.sign(obj, token_secret, { expiresIn: time, algorithm: 'HS512' })
    },
    //验证token
    check_token(token) {
        let data = null
        jwt.verify(token, token_secret, (err, decode) => { if (decode) data = decode })
        return data
    },
   
}