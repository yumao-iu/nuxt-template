import axios from 'axios'

export let api_index = () => {
    let env_data = useRuntimeConfig()
    let api = axios.create({ method: "post", baseURL: env_data.public.api_index })

    return {
        async getInit() {
            console.log(1);
        }
    }
}