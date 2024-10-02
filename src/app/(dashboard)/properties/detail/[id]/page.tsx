import PropertyDetail from '@/views/property/detail'
import type { PropertiesType } from '@/types/apps/propertyTypes'

// Función para obtener datos
const getData = async (): Promise<PropertiesType[]> => {
    const res = await fetch(`${process.env.API_URL}/apps/property-list`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        throw new Error('Failed to fetch property data')
    }

    return res.json()
}

// Componente de la página de detalles
const DetailPage = async ({
    params,
    searchParams
}: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    // Obtiene los datos
    const dataResult = await getData()

    const data = dataResult.find(item => item.id === Number(params.id))


    return (
        <>
            {/* Pasa el id y los datos de la propiedad al componente PropertyDetail */}
            <PropertyDetail id={params.id} propertyData={data} />
            {/* Puedes usar searchParams si los necesitas */}
        </>
    )
}

export default DetailPage
