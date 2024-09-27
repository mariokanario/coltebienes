import { API_PROTOCOL, API_BASE_URL, API_BASE_PORT, API_ACTION_SAVE_FORM_DATA_PHOTOS } from "@/configs/enviroments"
import axios from "axios"
import Cookies from "js-cookie"

const storePhotos = async (photos: string[], idProperty: number) => {
    try {
        const payload = {
            photos,
            property_data_id: idProperty
        }

        const response = await axios.post(
            `${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_SAVE_FORM_DATA_PHOTOS}`,
            payload,
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

export default storePhotos
