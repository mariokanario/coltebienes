"use client"

import PropertyDetail from '@/views/property/detail'


const DetailPage = ({ params }: { params: { id: string } }) => {

    return (
        <>
            {/* Pasa el id y los datos de la propiedad al componente PropertyDetail */}
            <PropertyDetail id={params.id} propertyData={[]} />
        </>
    )
}

export default DetailPage
