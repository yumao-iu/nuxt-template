import axios from 'axios';
import { adminStore } from '~/store/admin'


let admin_axios = axios.create({
    method: 'post',
    baseURL:'https://hl.sb:2000/api/v1/admin',
})

admin_axios.interceptors.request.use((config) => {
    let { admin_token } = adminStore()
    config.headers.Authorization = admin_token
    return config;
}, (err) => { console.log(err); })

export default {
 

}