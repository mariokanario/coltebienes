import axios, { AxiosResponse } from 'axios'
import { API_BASE_URL, API_BASE_PORT, API_ACTION_ME, API_PROTOCOL } from "@/configs/enviroments"

import Cookies from "js-cookie"


const me = async (): Promise<AxiosResponse> => {
    try {
        const token = Cookies.get('auth_token')
        const response = await axios.post(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_ME}`, { token });
        return response
    } catch (error) {
        throw error
    }

}

export default me
