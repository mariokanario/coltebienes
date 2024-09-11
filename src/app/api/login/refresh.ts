import { API_ACTION_REFRESH, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments";
import axios from "axios";
import Cookies from "js-cookie";

const refresh = async () => {
    const token = Cookies.get('auth_token')
    if (!token) {
        throw new Error("Token no encontrado")
    }

    try {
        const response = await axios.post(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_REFRESH}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        Cookies.set('auth_token', response.data.token)
        return response
    } catch (error) {
        console.error("Error al refrescar el token", error)
        throw error;
    }
}

export default refresh;
