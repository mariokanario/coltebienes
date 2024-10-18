import PropertyDetail from '@/views/property/detail'
import type { PropertiesType } from '@/types/apps/propertyTypes'
import { useEffect, useState } from 'react'
import detail from '@/app/api/captaciones/detail'
import { formDataInterface } from '@/components/context/FormDataInterface'
import { useAlert } from '@/components/AlertContext'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const DetailPage = ({ params }: { params: { id: string } }) => {
    const [formDataList, setFormDataList] = useState<formDataInterface[]>([])
    const { showMessage } = useAlert()
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await detail(params.id)
                const { status, data } = response
                if (status === 200) {
                    setFormDataList(data)
                } else if (status === 500) {
                    showMessage("Error del servidor, por favor intenta nuevamente más tarde.", "error")
                    Cookies.remove("auth_token")
                    router.push("/login")
                }
            } catch (error: any) {
                console.error("Error al obtener datos:", error)
                showMessage("Error al obtener datos, por favor intenta nuevamente.", "error")
                Cookies.remove("auth_token")
                router.push("/login")
            }
        }

        fetchData()
    }, [params.id]) // Ejecuta el useEffect cuando `params.id` cambia

    return (
        <>
            {/* Pasa el id y los datos de la propiedad al componente PropertyDetail */}
            <PropertyDetail id={params.id} propertyData={formDataList} />
        </>
    )
}

export default DetailPage
