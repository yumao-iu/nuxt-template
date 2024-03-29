import axios from 'axios'

let index_axios = axios.create({
    method: 'post',
    headers: {
        Authorization: 'jwt'
    }
})

index_axios.interceptors.request.use((config) => {
    config.baseURL = 'https://hl.sb:2000/api/v1/index/'
    return config
}, (err) => { console.log(err); })

index_axios.interceptors.response.use((config) => {
    return config
}, (err) => { console.log(err); })


export default {
    async init() {
        await index_axios({
            url: '/init_data',
        })
    },
}