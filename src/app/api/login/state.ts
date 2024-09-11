import { API_ACTION_STATE, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments"
import axios from "axios"

const state = async (id: number) => {
    try {
        const response = await axios.put(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_STATE}/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export default state
