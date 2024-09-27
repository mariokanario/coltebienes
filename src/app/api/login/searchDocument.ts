import { API_ACTION_SEARCH_DOCUMENT, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"



const searchDocument = async () => {
    const token = Cookies.get('auth_token')
    if (!token) {
        throw new Error("Token no encontrado")
    }
    try {
        const response = await axios.get(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_SEARCH_DOCUMENT}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        )
        return response
    } catch (error) {
        throw error
    }
}

export default searchDocument
