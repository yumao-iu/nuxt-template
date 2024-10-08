import axios from 'axios'
import config from './config'
import { storeUser } from '~/store/user'

let { userBaseURL } = config

let api = axios.create({ method: 'post', baseURL: userBaseURL })
api.interceptors.request.use((config) => {
    let { token_user } = storeUser()
    config.headers.Authorization = token_user
    return config
})
api.interceptors.response.use((config) => {
    return config.data
})
export default {

}