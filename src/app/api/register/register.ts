import axios from 'axios'
import { API_BASE_URL, API_BASE_PORT, API_PROTOCOL, API_ACTION_REGISTER } from '@/configs/enviroments'

const register = async (data: any) => {
    try {
        const response = await axios.post(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_REGISTER}`, {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.passwordConfirm,
            role: data.role,
            status: data.status === "Activo" ? 1 : 0
        });
        return response
    } catch (error) {
        throw error
    }
}

export default register;
