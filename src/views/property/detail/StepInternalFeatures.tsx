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

const StepInternalFeatures = ({ activeStep, handleNext, handlePrev, steps, id, propertyData }: Props) => {

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
            {propertyData.type == "vivienda" ?
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
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.coveredfinishes.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Estado del inmueble</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.propertystatus.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de habitaciones</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.roomsnum}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de baños</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.bathroomnum}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de parqueaderos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.garagenum}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Closet</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.closet}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.closetcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Closet de lino</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.linencloset}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.linenclosetcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Vestier</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.dressingroom}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cantidad</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.dressingroomcount}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Bañera</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.bathtub}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Jacuzzi</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.jacuzzi}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Chimenea</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.chimney}
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
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.kitchen.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Pisos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.floors.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Sala</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.dining}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Comedor</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.diningroom}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Sala comedor</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.lounge}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Deck</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.deck}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Balcón</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.balcony}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Terraza</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.terrace}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Hall</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.hall}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Zona de ropas</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.clotheszone}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Patio</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.yard}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Duplex</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.duplex}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Loft</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.loft}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Penthouse</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.penthouse}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Puerta de seguridad</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.securitydoor}
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
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.coveredfinishes}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Altura en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.heightmeters}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Fondo en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.depthmeters}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Frente en metros</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.frontmeters}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Cocina</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.kitchen.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Estado del inmueble</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.propertystatus.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Energía</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.energy.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Otras especificaciones</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.others}
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
                                            <Typography color='text.primary'>Tipo de bodega</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.winery}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Pisos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.floors.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Balcón</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.balcony}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Terraza</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.terrace}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Aire acondicionado</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.airconditioning}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Aire central</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.centralair}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Vigilancia</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.surveillance.join(', ')}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de baños</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.bathroomnum}
                                            </Typography>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Typography color='text.primary'>Número de parqueaderos</Typography>
                                        </td>
                                        <td>
                                            <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                                {propertyData.garagenum}
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
