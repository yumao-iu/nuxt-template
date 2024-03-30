import mysql from 'mysql2'
import nodemailer from 'nodemailer'
import multer from 'multer'
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
    id: '2021001139656578',
    privateKey: 'MIIEpAIBAAKCAQEAqYQhciF86r/RW//if05XH+0jwjMWU4ETxuVrYIPNeZ6JfFDn/I4RtzxRdngx1Hg6e01zpIgs5BdgTQhdEx2KRcvikjZz7uPK0GG8vsTgUB5xowf4tqb09zvrP/W/7vn9qnuJvbOPvFQqnWvHoA7ItXxrgZG5pRBNgkkYXCWtG1mKMeBXVCXWg1ByJ+/XVdu0BQ17DvGsFIaYFsHCx0+240ASrsdTUGv7ACJjuh6zm1taGNc74+AQOp4wLCzKg9JShBX1pOLWnxmEVOKVgQEWvJDAVewjOccZTJOlxn1NIgEJ15TzqF3Pj/UeTrdchnjFCvCSZAwu+Je0xCyPg2bViwIDAQABAoIBAGROp2vdnQlb0Arcc65ZMPzXWh2EFWX8LzO2db96vo+E3F4PkfbEKn9+1cWAghvzuMdVoWRuoAGoQ3fRxyGUjUmXx841IozthgmgjAtmfEVsflm2UdnjGXlin2YNiTFkBFJpH6x9IESUmVLlgA6aMPITWZomHPAroXHCxwNf1/siGch9MAyUtetELCA6/17gLdpw1xJXye7XfDpXj7TyuVzp6b0NKccgTz+IbCH8O3HRgEWP/xw9IUUAQ1gRsJRDP8wPauJzbw2CmKj1hgHhWPjY0Ku1Zhg82QYdaCjEoxT62R40sesBV7gkOrwd68m05y/8PJv1tEJBd5RpHmlLNmECgYEA+7rAqZmOEocKa10Y8Bhnu5XVjV+RjXA/4qGBVwBZhVMATflzhN8oNXauBukNQUVR8TAbXgA0XwfopZijKPJT/dB6+RBqzdTa/U9ucHB7f7+bPURA25GKk3lYuK07kFMZivxZRH0yJpetel9pc1rXBY0E5I9Ew/hQlcAt+rGl7v0CgYEArGRUdZsWEoPgr893WEuiusK4ifvaWSo/ZpK4rxTDIwQ56lD+hlqYW9ZZYOTDnt5PACOJbZX1RiL84uZqz9FQ/hH0+6t6o3dmVRd5YT8NZnDJncLqI6Ej7lgqRpk2QI9wf8YLSEuZ6S2KMHY7Piv4dRNg970NO3jBDIu9ZO41MScCgYBK7kgzM9YqhbAATXIC5gDawbsTngMBiww5NcH+V8hN+2r3yu0r/BFH+M/MlsqvRychGCTNUlpEf2ItCMZohdmij9BLGyvvoRCenmpNZe4dFLftAMgdk7EgPNq//jDgwRu1V3BrBqlK+5NT/dqxz7R5noR6VHsvqlayfMYy/XZbMQKBgQCGNf4DKWA/vegZN73EQe5I0/vzgN32+QsvAh9CPznEcy/bmn7tfm6LYQ9offFGJ/D9PK1rYYn4tpiG1bhmXqFdjAFcRZ5O0VAcAxB+gyYdkMWGSw8Z+gQNNRqEqBcyn/mHoFl8SU9j2A5zuDhbKMRf8VxWwxogKNyytcAXadSDlQKBgQDz1XUnTTRhtZGkjxAejn78MdFSexDeZ5YEejjPlQY1vaEu24mQ+prsFsuAR85ao4ruM4+mgHAua9+Y/1l4NRMw0Py/lxiFsUESm3fn6Cpdiv98tBSHypdh719KJpLbk7cTDq9WCDOqgnMcKcJH1eJnzAATw8BQ/3X0KDgAojfDAQ==',
    publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkCuRuhRXHk8NSPDv0bj6vNIHJq9J14OLiJ9Qlspw0dtnmiSl/5Ta0jYezGOW0Z2IyVbedy9usmXeS8Th6EFqwT7QnzIDKB8fRzZ4DLX97pN/Oi7prT9oI7ozyZZwH9Mmq8o1ecRKOvRxVvsU+g4p18xjJQEvvzzgx3EpHFSpJHGl0fOcWXLELrxpv0gfexP9bw0JjOaHmBDicLxrjANZ67HewUjvI2dYXA9ftJUxECbNVtCHpwAxZ8JAWpCWwvRxGuYOnGTn+Xta+3lsTMKhrdgMS3Kn/jYmXf5layuHRpvHtMWNCzjHqKA5NP4WPLRr2GlH/ZcPlC/5CU6Sh7BxGwIDAQAB',
}
let token_secret = "yumao"
let mail = nodemailer.createTransport({
    host: "smtp.163.com",
    port: 465,
    secure: true,
    auth: {
        user: "mm1799498990@163.com",
        pass: "FQELTKBIUDIYGPLI",
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

console.log('现在环境是:'+process.env.NODE_ENV,'数据库远程地址:'+ process.env.db_host);

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