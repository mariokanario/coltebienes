import axios from 'axios'
import { API_BASE_URL, API_BASE_PORT, API_PROTOCOL, API_ACTION_UPDATE_PASSWORD } from '@/configs/enviroments'

const updatePasswords = async (id: any, data: any) => {
    try {
        const response = await axios.put(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_UPDATE_PASSWORD}/${id}`,
            {
                password: data.password,
                password_confirmation: data.passwordConfirm
            }
        );
        return response;
    } catch (error) {
        return error;
    }
}

export default updatePasswords;
