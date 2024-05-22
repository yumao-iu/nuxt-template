import axios from 'axios'
import config from './config'

let { indexBaseURL } = config

let api = axios.create({ method: 'post', baseURL: indexBaseURL })
api.interceptors.response.use((config): any => {
    return config.data
})
export default {
    async init() {
        let { data } = await api({ url: '/init' })
        return data
    },
}