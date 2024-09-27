import { formDataInterface } from "@/components/context/FormDataInterface"
import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_LIST_FORM_DATA } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const list = async (isHouseNumber: number) => {
    try {
        const response = await axios.get(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_LIST_FORM_DATA}/${isHouseNumber}`,
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

export default list
