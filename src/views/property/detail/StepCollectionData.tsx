// React Imports
import type { ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'


import DirectionalIcon from '@components/DirectionalIcon';

import tableStyles from '@core/styles/table.module.css'


// Component Imports
import { useProvider } from '@/components/context/Provider';


type Props = {
    activeStep: number
    handleNext: () => void
    handlePrev: () => void
    steps: { title: string; subtitle: string }[]
    id: string
    propertyData: any;
}



const StepCollectionData = ({ activeStep, handleNext, handlePrev, steps, id, propertyData }: Props) => {

    const { setGlobalType } = useProvider();

    const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
        if (typeof prop === 'string') {
            setGlobalType(prop)

        } else {
            setGlobalType((prop.target as HTMLInputElement).value)

        }
    }

    return (



        <Grid container spacing={12}>

            <Grid item xs={12} md={6}>
                <div className='overflow-x-auto border rounded'>
                    <table className={tableStyles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Departamento</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.department}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Ciudad</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.city}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Barrio:</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.neighborhood}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Nombre de la copropiedad:</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.coownershipname}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Tipo de inmueble</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.propertytype}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Tipo de gestión:</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.charge}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Canon</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.canyon}
                                    </Typography>
                                </td>
                            </tr>

                            {propertyData.type == "vivienda" ?
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Destinación</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.destination}
                                        </Typography>
                                    </td>
                                </tr>
                                :
                                null
                            }
                        </tbody>
                    </table>
                </div>
            </Grid>

            <Grid item xs={12} md={6}>
                <div className='overflow-x-auto border rounded'>
                    <table className={tableStyles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Valor venta</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.salevalue}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Valor administración</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.adminvalue}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Incluida</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.adminincluded}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Área construida</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.builtarea}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Área privada</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.privatearea}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Año de construcción</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.yearconstruction}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Dirección</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.addressbuild}
                                    </Typography>
                                </td>
                            </tr>
                            {propertyData.type == "vivienda" ?
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Estrato</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.stratum}
                                        </Typography>
                                    </td>
                                </tr>
                                :
                                null
                            }


                        </tbody>
                    </table>
                </div>
            </Grid>






            <Grid item xs={12}>
                <div className='flex items-center justify-between'>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={activeStep === 0}
                        onClick={handlePrev}
                        startIcon={<DirectionalIcon ltrIconClass='tabler-arrow-left' rtlIconClass='tabler-arrow-right' />}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleNext}
                        endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                        }
                    >
                        Siguiente
                    </Button>
                </div>
            </Grid>


        </Grid>

    )
}

export default StepCollectionData
