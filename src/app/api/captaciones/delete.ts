import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_DELETE_FORM_DATA } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const deleteRow = async (id: number | undefined) => {
    try {
        const response = await axios.delete(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_DELETE_FORM_DATA}/${id}`,
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

export default deleteRow
