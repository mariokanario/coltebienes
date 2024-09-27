import { API_ACTION_UPDATE, API_BASE_PORT, API_BASE_URL, API_PROTOCOL } from "@/configs/enviroments"
import axios from "axios"

const updateUser = async (data: any, id: any) => {
    const dataUser = {
        'name': data.name,
        'number_document': data.number_document,
        'email': data.email,
        'role': data.role,
        'state': data.status === "Activo" ? 1 : 0
    }
    try {
        const response = await axios.put(`${API_PROTOCOL}${API_BASE_URL}:${API_BASE_PORT}/${API_ACTION_UPDATE}/${id}`, dataUser)
        return response
    } catch (error) {
        throw error
    }
}

export default updateUser
