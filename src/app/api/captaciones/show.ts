import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_SHOW_FORM_DATA } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const show = async (cedula: string) => {
    try {
        const response = await axios.get(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_SHOW_FORM_DATA}/${cedula}`,
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

export default show
