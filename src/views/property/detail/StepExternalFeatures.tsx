// React Imports

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

const StepExternalFeatures = ({ activeStep, handleNext, handlePrev, steps, id }: Props) => {

    const { formData } = useForm();

    return (

        <Grid container spacing={12}>

            {formData.globaltype == "comercio" ?
                <Grid item xs={12} md={6}>
                    <div className='overflow-x-auto border rounded'>
                        <table className={tableStyles.table}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Parque industrial</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.industrial_park
                                                ? formData.industrial_park.charAt(0).toUpperCase() + formData.industrial_park.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Bahia de parqueo</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.parking_bay
                                                ? formData.parking_bay.charAt(0).toUpperCase() + formData.parking_bay.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Baños comunales</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.communal_bathrooms
                                                ? formData.communal_bathrooms.charAt(0).toUpperCase() + formData.communal_bathrooms.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Baños públicos</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.public_toilets
                                                ? formData.public_toilets.charAt(0).toUpperCase() + formData.public_toilets.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Muelle a nivel</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.level_dock
                                                ? formData.level_dock.charAt(0).toUpperCase() + formData.level_dock.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Muelle deprimido</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.idepressed_dock
                                                ? formData.idepressed_dock.charAt(0).toUpperCase() + formData.idepressed_dock.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Puente grúa</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.bridgecrane
                                                ? formData.bridgecrane.charAt(0).toUpperCase() + formData.bridgecrane.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Acceso digital en edificio</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.digital_access_in_building
                                                ? formData.digital_access_in_building.charAt(0).toUpperCase() + formData.digital_access_in_building.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Fachada</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.facade}
                                        </Typography>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Grid>

                :
                null
            }



            <Grid item xs={12} md={6}>
                <div className='overflow-x-auto border rounded'>
                    <table className={tableStyles.table}>
                        <tbody>

                            {formData.globaltype == "local" ?
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Unidad</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.unit_type}
                                        </Typography>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Ladrillo a la vista</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {formData.exposedbrick
                                                ? formData.exposedbrick.charAt(0).toUpperCase() + formData.exposedbrick.slice(1)
                                                : ''}
                                        </Typography>
                                    </td>
                                </tr>
                            }
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Cuarto útil</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.useful_room
                                            ? formData.useful_room.charAt(0).toUpperCase() + formData.useful_room.slice(1)
                                            : ''}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Cantidad de niveles</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.number_of_levels}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>En el piso número</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.floor_number}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Otras especificaciones</Typography>
                                </td>
                                <td>
                                    {/* <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {
                                            Object.entries(formData.otherspecifications)
                                                .map(([key, value]) => (
                                                    `${propertyTranslations[key] || key}: ${value}`
                                                )).join(', ')
                                        }
                                    </Typography> */}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Parqueadero</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.parking_lot}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Unidad</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.unit_type}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Vigilancia</Typography>
                                </td>
                                <td>
                                    {formData.surveillanceExternal?.length ? (
                                        formData.surveillanceExternal.map((value, index) => (
                                            <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                {value}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography color="text.primary">No external surveillance information available</Typography>
                                    )}


                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Zonas comunes</Typography>
                                </td>
                                <td>
                                    {formData.commonzones?.length ? (
                                        formData.commonzones.map((value, index) => (
                                            <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                {value}
                                            </Typography>
                                        ))
                                    ) : (
                                        <Typography color="text.primary">No common zone information available</Typography>
                                    )}


                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Capacidad de carga de t/m² del piso</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.floor_load_capacity
                                            ? formData.floor_load_capacity.charAt(0).toUpperCase() + formData.floor_load_capacity.slice(1)
                                            : ''}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Cantidad de carga</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.quantity_load_capacity}
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

export default StepExternalFeatures
