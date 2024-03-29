import config from "./config"
import jwt from 'jsonwebtoken'
import multer from 'multer'
import AlipaySdk from "alipay-sdk";
import moment from "moment";
const alipaySdk = new AlipaySdk({
    appId: config.alipay.id,
    privateKey: config.alipay.privateKey,
    alipayPublicKey: config.alipay.publicKey
});

let dest = ''
if (process.env.NODE_ENV == 'development') dest = './public/images';
else dest = '.output/public/images';

let upload = multer({
    dest, //这个目录相对于项目文件中node_modules 
    limits: {
        files: 9,
        fields: 10,
        fileSize: 10.5 * 1024 * 1024
    }
}).array('files', 9)

let { db, token_secret, mail } = config
let _mail = mail


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
    //检查重复数据
    async check_exist(table, filed, value) {
        let flag = 0;
        if (table == 'user') {
            if (filed == 'user') {
                let data = await this.get_user({ name: null, user: value, mail: null })
                if (data) flag = data
            } else if (filed == 'mail') {
                let data = await this.get_user({ name: null, user: null, mail: value })
                if (data) flag = data
            } else if (filed == 'name') {
                let data = await this.get_user({ name: value, user: null, mail: value })
                if (data) flag = data
            }
        } else if (table == 'admin') {
            if (filed == 'user') {
                let data = await this.get_admin({ user: value, mail: null })
                if (data) flag = data
            } else if (filed == 'mail') {
                let data = await this.get_admin({ user: null, mail: value })
                if (data) flag = data
            }
        }
        return flag;
    },
    //首页轮播图
    get_swiper() {
        return new Promise((solve, reject) => {
            db.execute('select * from swiper', (err, result) => {
                solve(result);
            })
        })
    },
    //首页新闻
    get_news() {
        return new Promise((solve, reject) => {
            db.execute('select * from news', (err, result) => {
                solve(result);
            })
        })
    },
    //首页食物
    get_show_food_1() {
        return new Promise((solve, reject) => {
            db.execute("select * from mess where title = 'show_food'", (err, result) => {
                solve(result[0].content);
            })
        })
    },
    //首页食物
    get_show_food_2(food_str) {

        return new Promise((solve, reject) => {
            db.execute(`select * from food where id in (${food_str})`, (err, result) => {
                solve(result);
            })
        })
    },
    //首页信息
    get_detail() {
        return new Promise((solve, reject) => {
            db.execute('select * from detail', (err, result) => {
                solve(result);
            })
        })
    },
    //返回首页初始数据
    async get_init_data() {
        return new Promise(async (solve, reject) => {
            let data = {}
            data.news = await this.get_news()
            data.detail = await this.get_detail()
            data.swiper = await this.get_swiper()
            data.food_1 = await this.get_show_food_1()
            data.food = await this.get_show_food_2(data.food_1)
            delete data.food_1
            solve(data)
        })
    },
    //返回搜索食物
    async search_food(name) {
        return new Promise(async (solve, reject) => {
            db.execute(`select * from food where name like '%${name}%'`, (err, result) => {
                solve(result)
            })
        })
    },
    //返回管理员搜索食物
    async search_admin_food(text) {
        return new Promise(async (solve, reject) => {
            db.execute(`select * from food where name like '%${text}%' or detail like '%${text}%' or introduce like '%${text}%' or localtion like '%${text}%' order by id desc`, (err, result) => {
                solve(result)
            })
        })
    },
    //管理员登录
    async admin_login(info) {
        return new Promise(async (solve, reject) => {
            let { user, pass } = info
            db.execute(`select * from admin where user = ? and pass = ?`, [user, pass], (err, result) => {
                if (result) solve(result[0])
                else console.log('error');
            })
        })
    },
    //获取某管理信息
    async get_admin(info) {
        return new Promise(async (solve, reject) => {
            let { user, mail } = info
            db.execute('select * from admin where user = ? or mail = ?', [user, mail], (err, result) => {
                if (result.length) {
                    solve(result[0])
                } else solve(0)
            })
        })
    },
    //获取某用户信息
    async get_user(info) {
        return new Promise(async (solve, reject) => {
            let { name, user, mail } = info
            db.execute('select * from user where user = ? or mail = ? or name = ?', [user, mail, name], (err, result) => {
                if (result.length) {
                    solve(result[0])
                } else solve(0)
            })
        })
    },
    //用户登录
    async user_login(info) {
        return new Promise(async (solve, reject) => {
            let { user, pass } = info
            db.execute(`select * from user where user = ? and pass = ?`, [user, pass], (err, result) => {
                if (result) solve(result[0])
                else console.log('error');
            })
        })
    },
    //用户注册检查
    async user_check(info) {
        return new Promise(async (solve, reject) => {
            let { user, pass, mail } = info
            let msg = { flag: 0 }
            let data_01 = await this.check_exist('user', 'user', user)
            if (data_01) msg.flag = -1
            let data_02 = await this.check_exist('user', 'mail', mail)
            if (data_02) msg.flag = -2
            if (!data_01 && !data_02) db.execute(`insert into user(user,pass,mail,name) value(?,?,?,'用户_${parseInt(Math.random() * 10000000)}')`, [user, pass, mail])
            solve(msg)
        })
    },
    //用户账号找回
    async user_find(info) {
        return new Promise(async (solve, reject) => {
            let { user, pass, mail } = info
            info.name = -1
            let data_01 = await this.check_exist('user', 'user', user)
            let data_02 = await this.check_exist('user', 'mail', mail)
            if (data_01 || data_02) {
                let user_data = await this.get_user(info);
                let token = this.set_token({ user, pass }, 300);
                await _mail.sendMail({
                    from: "mm1799498990@163.com",
                    to: user_data.mail,
                    subject: "网站密码找回",
                    text: "网站密码找回",
                    html: `访问链接找回(5分钟内有效):<p>http://localhost:3000/find?token=${token}</p>`,
                })
                solve({ code: 1 })
            } else solve({ code: 0 })
        })
    },
    //用户账号找回
    async check_find(token) {
        return new Promise(async (solve, reject) => {
            let flag = this.check_token(token)
            if (flag) {
                let { user, pass } = flag
                db.execute('update user set pass = ? where user = ? or mail = ?', [pass, user, user], (err, result) => { })
                solve({ code: 1 })
            } else solve({ code: 0 })

        })
    },
    //设置轮播图
    async set_swiper(imgname) {
        return new Promise((solve, reject) => {
            db.execute('insert into swiper(img) value(?)', [imgname], (err, result) => {
                if (result) solve(1)
                else if (err) solve(0)
            })
        })
    },
    //获取所有员工
    async get_staff() {
        return new Promise((solve, reject) => {
            db.execute('select * from staff order by id desc', (err, result) => {
                if (result) {
                    result = this.filter_time(result)
                    solve(result)
                }
            })
        })
    },
    //获取所有用户
    async get_all_user() {
        return new Promise((solve, reject) => {
            db.execute('select * from user order by id desc', (err, result) => {
                if (result) {
                    result = this.filter_time(result)
                    solve(result)
                }
            })
        })
    },
    //获取所有食物
    async get_food() {
        return new Promise((solve, reject) => {
            db.execute('select * from food order by id desc', (err, result) => {
                if (result) {
                    result = this.filter_time(result)
                    solve(result)
                }
            })
        })
    },
    //获取特定食物
    async get_id_food(id) {
        return new Promise((solve, reject) => {
            db.execute('select * from food where id  = ?', [id], (err, result) => {
                if (result) {
                    result = this.filter_time(result)
                    result[0].price = parseFloat(result[0].price)
                    solve(result[0])
                }
            })
        })
    },
    //获取特定用户
    async get_id_user(id) {
        return new Promise((solve, reject) => {
            db.execute('select * from user where id  = ?', [id], (err, result) => {
                if (result) {
                    result = this.filter_time(result)
                    result[0].price = parseFloat(result[0].price)
                    solve(result[0])
                }
            })
        })
    },
    //获取特定用户
    async get_user_user(user) {
        return new Promise((solve, reject) => {
            db.execute('select * from user where user  = ?', [user], (err, result) => {
                if (result) {
                    result[0].price = parseFloat(result[0].price)
                    solve(result[0])
                }
            })
        })
    },
    //验证管理员密码
    async check_old_pass(info) {
        let { id, old_pass } = info
        return new Promise((solve, reject) => {
            db.execute('select * from admin where id = ? and pass = ?', [id, old_pass], (err, result) => {
                if (result.length) solve(1)
                else solve(0)
            })
        })

    },
    //修改管理员账号
    async set_account(info) {
        return new Promise(async (solve, reject) => {
            let { admin_id, user, mail, new_pass } = info
            db.execute('update admin set user=?,mail=?,pass=? where id=?', [user, mail, new_pass, admin_id], (err, result) => {
                if (err) solve(0)
                else solve(1)
            })
        })
    },
    //搜索员工
    async search_staff(text) {
        return new Promise(async (solve, reject) => {
            db.execute(`select * from staff where name like '%${text}%' or sort like '%${text}%' order by id desc`, (err, result) => {
                solve(result)
            })
        })
    },
    //搜索用户
    async search_user(text) {
        return new Promise(async (solve, reject) => {
            db.execute(`select * from user where user like '%${text}%' or pass like '%${text}%' or mail like '%${text}%' order by id desc`, (err, result) => {
                solve(result)
            })
        })
    },
    //添加食物
    async add_food(data) {
        let { name, detail, price, localtion, introduce, img } = data
        return new Promise(async (solve, reject) => {
            db.execute("insert into food(name,detail,price,localtion,introduce,img) value(?,?,?,?,?,?)", [name, detail, price, localtion, introduce, img], (err, result) => {
                solve(result)
            })
        })
    },
    //支付功能
    async alipay(type, info) {
        let data = null;
        if (type == 'pay') {
            data = alipaySdk.exec("alipay.trade.precreate", {
                bizContent: {
                    out_trade_no: "yumao_" + Math.ceil(Math.random() * 100000000000),
                    total_amount: info.price,
                    subject: "一颗大白菜",
                },
            });
        } else if (type == 'query') {
            data = alipaySdk.exec("alipay.trade.query", {
                bizContent: {
                    out_trade_no: info.trade,
                },
            });
        }
        return data
    },
    //订单操作
    async add_trade(type, info) {
        db.execute('insert into trade(fid,uid,out_trade_on,food_name,food_price,food_localtion) value(?,?,?,?,?,?)', [info.fid, info.uid, info.out_trade_no, info.name, info.price, info.localtion])
        return 1
    },
    //操作用户金额
    async set_user_price(type, uid, price) {
        price = parseFloat(price)
        let user = await this.get_id_user(uid)
        if (type == 'add') {
            let total = user.price + price
            db.execute('update user set price = ? where id = ? ', [total, uid])
        } else if (type == 'remove') {
            let total = user.price - price
            if (total < 0) total = 0.00
            db.execute('update user set price = ? where id = ? ', [total, uid])
        } else if (type == 'reset') {
            if (price < 0) return 1
            db.execute('update user set price = ? where id = ? ', [price, uid])
        }
        return 1
    },
    //增加订单凭证
    async add_out_trade_on(out_trade_on) {
        let data = await this.get_out_trade_on(out_trade_on)
        if (data) return 0
        db.execute('insert into evidence(out_trade_on) value(?)', [out_trade_on])
        return 1
    },
    //获取订单凭证
    async get_out_trade_on(out_trade_no) {
        return new Promise((solve, reject) => {
            db.execute('select * from  evidence  where out_trade_on = ? ', [out_trade_no], (e, r) => {
                if (r) solve(r[0])
            })
        })
    },
    //更新用户信息
    async update_user_data(uid) {
        let data = await this.get_id_user(uid)
        let msg = { token: '', data: '' }
        msg.token = this.set_token({ power: 'user', id: data.id, user: data.user })
        msg.data = data
        return msg
    },
    //获取用户所有订单
    async get_user_trade(uid) {
        return new Promise((solve, reject) => {
            db.execute('select * from trade where uid = ? order by id desc', [uid], (err, result) => {
                if (result.length){
                    result = this.filter_time(result)
                    result.forEach((v) => {
                        v.method = v.out_trade_on == "balance_pay" ? "余额购买" : "扫码购买";
                    });
                }
                solve(result)
            })
        })
    },
    //修改用户信息
    async set_table_filed(table, filed, value, id) {
        db.execute(`update ${table} set ${filed} = '${value}' where id = ${id}`, (err, result) => {
            if (err) console.log(err);
        })
    },
    //获取乱七八糟
    async get_mess(title) {
        return new Promise(async (s, r) => {
            db.execute("select * from mess where title = ?", [title], (err, result) => {
                result = this.filter_time(result)
                s(result[0])
            })
        })
    },
    //过滤时间
    filter_time(data) {
        if (!Array.isArray(data)) return new Error('非数组数据类型！')
        data.forEach((v) => {
            v.time = moment(v.time).format('YYYY-MM-DD HH:mm:ss')
        })
        return data
    }
}