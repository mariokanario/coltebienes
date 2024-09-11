import axios from 'axios'
import Cookies from 'js-cookie';
import { API_BASE_URL, API_BASE_PORT, API_ACTION_LOGOUT, API_PROTOCOL } from '@/configs/enviroments'

const logout = async () => {
    try {
        const token = Cookies.get('auth_token')
        const response = await axios.post(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_LOGOUT}`, { token })
        return response
    } catch (error) {
        return error
    }
}

export default logout;
