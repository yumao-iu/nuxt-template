import axios from 'axios'
import { userStore } from '~/store/user'


let user_axios = axios.create({
    method: 'post',
    baseURL:'https://hl.sb:2000/api/v1/user',
    headers: {
        Authorization: 'jwt'
    }
})

user_axios.interceptors.request.use((config) => {
    let { user_token } = userStore()
    config.headers.Authorization = user_token
    return config
}, (err) => { console.log(err); })

user_axios.interceptors.response.use((config) => {
    return config
}, (err) => { console.log(err); })

export default {
   
}