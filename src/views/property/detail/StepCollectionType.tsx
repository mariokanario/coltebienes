// React Imports
import type { ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import tableStyles from '@core/styles/table.module.css'
import 'swiper/css';
import 'swiper/css/autoplay';

import DirectionalIcon from '@components/DirectionalIcon';

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


const StepCollectionType = ({ activeStep, handleNext, handlePrev, steps, id, propertyData }: Props) => {

    const { globalType, setGlobalType } = useProvider();

    const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
        if (typeof prop === 'string') {
            setGlobalType(prop)

        } else {
            setGlobalType((prop.target as HTMLInputElement).value)

        }
    }

    return (
        <Grid container spacing={12}>

            <Grid item xs={12}>
                <div className='overflow-x-auto border rounded'>
                    <table className={tableStyles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Código</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.code}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Tipo</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.type}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Nombre del propietario</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.name}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Celular del propietario</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.cellphone}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Correo</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.email}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Autoriza publicar en portales</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {propertyData.authorization}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Grid>

            <Grid item xs={12} lg={9}>



                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={10}
                    slidesPerView={3}
                    // slidesPerView='auto' 
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}

                >



                    <SwiperSlide>
                        <img className='w-full' src='/images/properties/images.jfif' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src='/images/properties/images2.jpg' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src='/images/properties/images3.jpg' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full' src='/images/properties/images4.jpg' />
                    </SwiperSlide>

                </Swiper>



            </Grid>

            <Grid item xs={12}>
                <div className='flex items-center justify-between'>
                    <Button
                        variant='tonal'
                        color='secondary'
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

export default StepCollectionType
