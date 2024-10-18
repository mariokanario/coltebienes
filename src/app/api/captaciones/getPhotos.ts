import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_SAVE_FORM_DATA_PHOTOS } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const getPhotos = async (idProperty: any) => {

    try {

        const response = await axios.get(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_SAVE_FORM_DATA_PHOTOS}/${idProperty}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('auth_token')}`,
                }
            }
        )
        return response
    } catch (error: any) {
        return error.response ? error.response : error
    }
}

export default getPhotos
