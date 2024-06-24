'use client'

import PropertyDetail from '@/views/property/detail';
import { useRouter, useParams } from 'next/navigation';
import React from 'react'

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
