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

const StepInternalFeatures = ({ activeStep, handleNext, handlePrev, steps, id }: Props) => {

    const { setGlobalType } = useProvider();
    const { formData } = useForm()
    return (

        <Grid container spacing={12}>
            {formData.globaltype == "vivienda" ?
                <>
                    <Grid item xs={12} md={6}>
                        <div className='overflow-x-auto border rounded'>
                            <table className={tableStyles.table}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Acabados cubierta</Typography>
                                        </td>
                                        <td>
                                            {formData.coveredfinishes?.length ? (
                                                formData.coveredfinishes.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No covered finishes available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Estado del inmueble</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.propertystatus}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de habitaciones</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.number_of_rooms}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de baños</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.number_of_bathrooms}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de parqueaderos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.number_of_parking_spaces}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Closet</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.closet
                                                    ? formData.closet.charAt(0).toUpperCase() + formData.closet.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad de closets</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.closetcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Closet de lino</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.linencloset
                                                    ? formData.linencloset.charAt(0).toUpperCase() + formData.linencloset.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad de closets de lino</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.linenclosetcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Vestier</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.dressingroom
                                                    ? formData.dressingroom.charAt(0).toUpperCase() + formData.dressingroom.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad de vestiers</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.dressingroomcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Bañera</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.bathtub
                                                    ? formData.bathtub.charAt(0).toUpperCase() + formData.bathtub.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Jacuzzi</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.jacuzzi
                                                    ? formData.jacuzzi.charAt(0).toUpperCase() + formData.jacuzzi.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Chimenea</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.chimney
                                                    ? formData.chimney.charAt(0).toUpperCase() + formData.chimney.slice(1)
                                                    : ''}
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
                                            <Typography color='text.primary'>Cocina</Typography>
                                        </td>
                                        <td>
                                            {formData.type_kitchen?.length ? (
                                                formData.type_kitchen.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No kitchen types available</Typography>
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Pisos</Typography>
                                        </td>
                                        <td>
                                            {formData.type_floor?.length ? (
                                                formData.type_floor.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No floor types available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Sala</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.dining
                                                    ? formData.dining.charAt(0).toUpperCase() + formData.dining.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Comedor</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.diningroom
                                                    ? formData.diningroom.charAt(0).toUpperCase() + formData.diningroom.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Sala comedor</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.lounge
                                                    ? formData.lounge.charAt(0).toUpperCase() + formData.lounge.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Deck</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.deck
                                                    ? formData.deck.charAt(0).toUpperCase() + formData.deck.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Balcón</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_a_balcony
                                                    ? formData.has_a_balcony.charAt(0).toUpperCase() + formData.has_a_balcony.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Terraza</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_a_terrace
                                                    ? formData.has_a_terrace.charAt(0).toUpperCase() + formData.has_a_terrace.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Hall</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.hall
                                                    ? formData.hall.charAt(0).toUpperCase() + formData.hall.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Zona de ropas</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.clotheszone
                                                    ? formData.clotheszone.charAt(0).toUpperCase() + formData.clotheszone.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Patio</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.yard
                                                    ? formData.yard.charAt(0).toUpperCase() + formData.yard.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Duplex</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.duplex
                                                    ? formData.duplex.charAt(0).toUpperCase() + formData.duplex.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Loft</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.loft
                                                    ? formData.loft.charAt(0).toUpperCase() + formData.loft.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Penthouse</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.penthouse
                                                    ? formData.penthouse.charAt(0).toUpperCase() + formData.penthouse.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Puerta de seguridad</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.securitydoor
                                                    ? formData.securitydoor.charAt(0).toUpperCase() + formData.securitydoor.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </>
                :
                <>
                    <Grid item xs={12} md={6}>
                        <div className='overflow-x-auto border rounded'>
                            <table className={tableStyles.table}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Acabados cubierta</Typography>
                                        </td>
                                        <td>
                                            {formData.coveredfinishes?.length ? (
                                                formData.coveredfinishes.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No covered finishes available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Altura en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.height}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Fondo en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.depth}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Frente en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.front}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cocina</Typography>
                                        </td>
                                        <td>
                                            {formData.type_kitchen?.length ? (
                                                formData.type_kitchen.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No kitchen types available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Estado del inmueble</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.propertystatus}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Energía</Typography>
                                        </td>
                                        <td>
                                            {formData.electric_connection?.length ? (
                                                formData.electric_connection.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No electric connections available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Otras especificaciones</Typography>
                                        </td>
                                        <td>
                                            {formData.others?.length ? (
                                                formData.others.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No additional information available</Typography>
                                            )}


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
                                            <Typography color='text.primary'>Tipo de bodega</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.winery}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Pisos</Typography>
                                        </td>
                                        <td>
                                            {formData.type_floor?.length ? (
                                                formData.type_floor.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No flooring information available</Typography>
                                            )}


                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Balcón</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_a_balcony
                                                    ? formData.has_a_balcony.charAt(0).toUpperCase() + formData.has_a_balcony.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Terraza</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_a_terrace
                                                    ? formData.has_a_terrace.charAt(0).toUpperCase() + formData.has_a_terrace.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Aire acondicionado</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_air_conditioner
                                                    ? formData.has_air_conditioner.charAt(0).toUpperCase() + formData.has_air_conditioner.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Aire central</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.has_central_air
                                                    ? formData.has_central_air.charAt(0).toUpperCase() + formData.has_central_air.slice(1)
                                                    : ''}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Vigilancia</Typography>
                                        </td>
                                        <td>
                                            {formData.surveillance?.length ? (
                                                formData.surveillance.map((value, index) => (
                                                    <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                        {value}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography color="text.primary">No surveillance information available</Typography>
                                            )}

                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de baños</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.number_of_bathrooms}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de parqueaderos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {formData.number_of_parking_spaces}
                                            </Typography>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </>
            }


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

export default StepInternalFeatures
