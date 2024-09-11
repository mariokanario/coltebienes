import { API_ACTION_USERS, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments"
import axios from "axios"

const users = async () => {
    try {
        const response = await axios.get(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_USERS}`)
        return response
    } catch (error) {
        throw error
    }
}

export default users
