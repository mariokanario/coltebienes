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

const StepExternalFeatures = ({ activeStep, handleNext, handlePrev, steps, id, propertyData }: Props) => {

    const { setGlobalType } = useProvider();

    const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
        if (typeof prop === 'string') {
            setGlobalType(prop)

        } else {
            setGlobalType((prop.target as HTMLInputElement).value)

        }
    }

    const propertyTranslations: { [key: string]: string } = {
        quantitypaved: "Acceso pavimentado",
        quantityfire: "Alarma de incendio",
        quantityrural: "Área rural",
        quantityurban: "Área urbana",
        quantityelevator: "Ascensor",
        quantityshopping: "En centro comercial",
        quantityinbuilding: "En edificio",
        quantityshoppingarea: "Zona comercial",
        quantityresidentialarea: "Zona residencial",
        quantityemergencystaircase: "Escalera de emergencia",
        quantitycorner: "Esquinero",
        quantityoutsidemall: "Fuera de centro comercial",
        quantitywinch: "Malacate",
        quantitytruck: "Puerta camión",
        quantitypedestrian: "Puerta peatonal",
        quantityshutter: "Puerta persiana",
        quantityglassdoor: "Puerta vidriera",
        quantityshut: "Shut de basura",
        quantityprivalelevator: "Ascensor privado",
        quantityclosedset: "Conjunto cerrado"
    };

    return (

        <Grid container spacing={12}>

            {propertyData.type == "local" ?
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
                                            {propertyData.industrialpark}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Bahia de parqueo</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.parkingbay}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Baños comunales</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.communalbathrooms}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Baños públicos</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.publictoilets}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Muelle a nivel</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.leveldock}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Muelle deprimido</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.depresseddock}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Puente grúa</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.bridgecrane}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Acceso digital en edificio</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.digitalaccess}
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Fachada</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.facade.join(', ')}
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

                            {propertyData.type == "local" ?
                                <tr>
                                    <td>
                                        <Typography color='text.primary'>Unidad</Typography>
                                    </td>
                                    <td>
                                        <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                            {propertyData.unit}
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
                                            {propertyData.exposedbrick}
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
                                        {propertyData.usefulroom}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Cantidad de niveles</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.numberlevels}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>En el piso número</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.onfloor}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Otras especificaciones</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {
                                            Object.entries(propertyData.otherspecifications)
                                                .map(([key, value]) => (
                                                    `${propertyTranslations[key] || key}: ${value}`
                                                )).join(', ')
                                        }
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Parqueadero</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.parking}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Unidad</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.unit}
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
                                    <Typography color='text.primary'>Zonas comunes</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.commonzones.join(', ')}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Capacidad de carga de t/m² del piso</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.coveredfinishes}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Cantidad</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.specificationsAmount}
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
