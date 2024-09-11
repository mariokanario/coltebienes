import { formDataInterface } from "@/components/context/FormDataInterface"
import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_SAVE_FORM_DATA } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const save = async (form: formDataInterface) => {
    try {
        const response = await axios.post(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_SAVE_FORM_DATA}`,
            form,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth_token')}`,
                }
            }
        )
        return response
    } catch (error) {
        throw error
    }
}

export default save
