import { API_ACTION_DELETE, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments"
import axios from "axios"

const deleteUser = async (id: number) => {
    try {
        const response = await axios.delete(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_DELETE}/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export default deleteUser
