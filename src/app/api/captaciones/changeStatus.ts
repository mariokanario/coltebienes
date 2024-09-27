import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_CHANGE_TO_STATUS_VIVIENDA } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const changeStatus = async (id: number, data?: any) => {
    try {
        const response = await axios.post(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_CHANGE_TO_STATUS_VIVIENDA}/${id}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth_token')}`,
                }
            }
        )
        return response
    } catch (error: any) {
        return error
    }
}

export default changeStatus
