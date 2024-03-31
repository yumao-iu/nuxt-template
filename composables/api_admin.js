import axios from 'axios'

export let api_admin = () => {
    let env_data = useRuntimeConfig()
    let api = axios.create({ method: "post", baseURL: env_data.public.api_admin })
    api.interceptors.response.use((config) => {
        return config
    })
    
    api.interceptors.response.use((config) => {
        return config.data
    })
    return {
        
    }
}