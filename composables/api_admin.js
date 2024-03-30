import axios from 'axios'

export let api_admin = () => {
    let env_data = useRuntimeConfig()
    let api = axios.create({ method: "post", baseURL: env_data.public.api_admin })

    return {
        async getInit() {
            console.log(1);
        }
    }
}