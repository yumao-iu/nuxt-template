import axios from 'axios'

export let api_user = () => {
    let env_data = useRuntimeConfig()
    let api = axios.create({ method: "post", baseURL: env_data.public.api_user })
    api.interceptors.response.use((config) => {
        return config
    })
    
    api.interceptors.response.use((config) => {
        return config.data
    })
    return {
       
    }
}