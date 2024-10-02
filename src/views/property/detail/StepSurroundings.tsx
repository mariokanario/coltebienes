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

const StepSurroundings = ({ activeStep, handleNext, handlePrev, steps, id, propertyData }: Props) => {

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
                                    <Typography color='text.primary'>Alrededores</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.surroundings.join(', ')}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Lugares de referencia mencionados</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.landmarks}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Otras características y observaciones</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.observations}
                                    </Typography>
                                </td>
                            </tr>
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
                                    <Typography color='text.primary'>Captador</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.collector}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Medio de captación</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.collectionmedium}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Fecha</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.collectiodate}
                                    </Typography>
                                </td>
                            </tr>


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
                        disabled
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

export default StepSurroundings
