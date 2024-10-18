// React Imports
import type { ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'


import DirectionalIcon from '@components/DirectionalIcon';

import tableStyles from '@core/styles/table.module.css'


// Component Imports
import { useProvider } from '@/components/context/Provider';
import { useForm } from '@/components/context/FormContext';


type Props = {
    activeStep: number
    handleNext: () => void
    handlePrev: () => void
    steps: { title: string; subtitle: string }[]
    id: string
}

const StepSurroundings = ({ activeStep, handleNext, handlePrev, steps, id }: Props) => {

    const { setGlobalType } = useProvider();
    const { formData } = useForm()
    return (

        <Grid container spacing={12}>

            <Grid item xs={12} md={6}>
                <div className='border rounded'>
                    <table className={tableStyles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Alrededores</Typography>
                                </td>
                                <td>
                                    {formData.otherspecificationsDings?.length ? (
                                        formData.otherspecificationsDings.map((spec, index) => (
                                            <Typography color="text.primary" sx={{ fontWeight: 'bold' }} key={index}>
                                                {spec}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography color="text.primary">No specifications available</Typography>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Lugares de referencia mencionados</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.landmarks}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Otras características y observaciones</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.observations}
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
                                        {formData.collector_name}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Medio de captación</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.collection_medium}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Fecha</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.collection_date}
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
                </div>
            </Grid>


        </Grid>

    )
}

export default StepSurroundings
