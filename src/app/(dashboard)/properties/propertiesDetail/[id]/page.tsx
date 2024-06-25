'use client'

import { useParams } from 'next/navigation';
import PropertyDetail from '@/views/property/detail';

const DetailPage = () => {

    const { id } = useParams();

    console.log(id);


    return (
        <>
            <PropertyDetail />
            <div>página de detalles: </div>
        </>
    )
}

export default DetailPage
