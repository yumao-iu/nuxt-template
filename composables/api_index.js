import axios from 'axios'

export let api_index = () => {
    let env_data = useRuntimeConfig()
    let api = axios.create({ method: "post", baseURL: env_data.public.api_index })

    api.interceptors.response.use((config) => {
        return config
    })
    
    api.interceptors.response.use((config) => {
        return config.data
    })

    return {
        async getInit() {
            return await api({ url: '/init_data' })
        }
    }
}