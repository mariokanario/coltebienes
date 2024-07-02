// import { useParams } from 'next/navigation';

import PropertyDetail from '@/views/property/detail';


const DetailPage = ({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    // const { id } = useParams();

    // console.log(id);


    return (
        <>
            <PropertyDetail />
            <div>página de detalles: {params.id} - {searchParams.h}</div>
        </>
    )
}

export default DetailPage
