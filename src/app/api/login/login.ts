import axios from 'axios'
import { API_BASE_URL, API_BASE_PORT, API_ACTION_LOGIN, API_PROTOCOL } from '@/configs/enviroments'

const login = async (email: string, password: string) => {

    try {
        const response = await axios.post(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_LOGIN}`, { email, password });
        return response
    } catch (error) {
        throw error
    }
}

export default login;
