import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_GET_ALL_PORTALS } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const getPortals = async () => {
    try {
        const response = await axios.get(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_GET_ALL_PORTALS}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth_token')}`,
                }
            }
        )
        return response
    } catch (error) {

    }
}

export default getPortals
