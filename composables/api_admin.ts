import axios from 'axios'
import config from './config'
import { storeAdmin } from '~/store/admin'
let { adminBaseURL } = config

let api = axios.create({ method: 'post', baseURL: adminBaseURL })

api.interceptors.request.use((config): any => {
    let { token_admin } = storeAdmin()
    config.headers.Authorization = token_admin
    return config
})
api.interceptors.response.use((config): any => {
    return config.data
})
export default {

}