import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_PUBLISH_PROPERTY } from "@/configs/enviroments"
import { RequestBodyPropertyPortal } from "@/views/property/list/ProperyListTable"
import axios from "axios"
import Cookies from "js-cookie"

const publishPortal = async (body: RequestBodyPropertyPortal) => {
    try {
        const response = await axios.post(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_PUBLISH_PROPERTY}`, body,
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

export default publishPortal
