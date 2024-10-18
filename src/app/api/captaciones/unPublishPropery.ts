import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_PUBLISH_PROPERTY_DELETE } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const unPublishPortal = async (id: any) => {
    try {
        const response = await axios.delete(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_PUBLISH_PROPERTY_DELETE}/${id}`,
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

export default unPublishPortal
