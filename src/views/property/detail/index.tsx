// MUI Imports
'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';


// Type Imports
import type { PropertiesType } from '@/types/apps/propertyTypes'

import tableStyles from '@core/styles/table.module.css'
import 'swiper/css';
import 'swiper/css/autoplay';


const PropertyDetail = ({ propertyData }: { propertyData?: PropertiesType[] }) => {
    return (
        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Card>
                    <CardContent className='sm:!p-12'>
                        <Grid container spacing={6}>

                            <Grid item xs={5}>
                                <div className='overflow-x-auto border rounded'>
                                    <table className={tableStyles.table}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Typography color='text.primary'>Tipo</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>Comercio</Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography color='text.primary'>Nombre del propietario</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>Pedro Perez</Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography color='text.primary'>Celular del propietario</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>3001234567</Typography>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <Typography color='text.primary'>Autoriza publicar en portales</Typography>
                                                </td>
                                                <td>
                                                    <Typography color='text.primary'>Si</Typography>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>

                            <Grid item xs={7}>
                                <div className='p-6 bg-actionHover rounded'>
                                    <Swiper
                                        modules={[Autoplay]}
                                        spaceBetween={10}
                                        slidesPerView={2}
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
                                </div>
                            </Grid>


                            <Grid item xs={12}>
                                <Grid container spacing={6}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className='flex flex-col gap-4'>
                                            <Typography className='font-medium' color='text.primary'>
                                                Datos de captación:
                                            </Typography>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Departamento:</Typography>
                                                    <Typography className='font-medium'>$12,110.55</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Ciudad:</Typography>
                                                    <Typography className='font-medium'>American Bank</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Barrio:</Typography>
                                                    <Typography className='font-medium'>United States</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Dirección:</Typography>
                                                    <Typography className='font-medium'>ETD95476213874685</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Nom. copropiedad:</Typography>
                                                    <Typography className='font-medium'>San Marcos</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Tipo de inmueble:</Typography>
                                                    <Typography className='font-medium'>Apartamento</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Encargo:</Typography>
                                                    <Typography className='font-medium'>$ 120,110.000</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Canon:</Typography>
                                                    <Typography className='font-medium'>$ 120,110.000</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Valor venta:</Typography>
                                                    <Typography className='font-medium'>$ 120,110.000</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Valor administración:</Typography>
                                                    <Typography className='font-medium'>$ 110.000</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Está incluida:</Typography>
                                                    <Typography className='font-medium'>Si</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Área construida:</Typography>
                                                    <Typography className='font-medium'>85 m2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Área privada:</Typography>
                                                    <Typography className='font-medium'>80 m2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Año de construcción:</Typography>
                                                    <Typography className='font-medium'>10/10/2000</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Número de baños:</Typography>
                                                    <Typography className='font-medium'>2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Número de parqueaderos:</Typography>
                                                    <Typography className='font-medium'>1</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className='flex flex-col gap-4'>
                                            <Typography className='font-medium' color='text.primary'>
                                                Características internas:
                                            </Typography>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Acabados cubierta:</Typography>
                                                    <Typography className='font-medium'>Cielo raso madera</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Altura:</Typography>
                                                    <Typography className='font-medium'>4 mt2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Bañera:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Jacuzzi:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Chimenea:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Closet:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Closet de lino:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Vestier:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Cocina:</Typography>
                                                    <Typography className='font-medium'>Cocina abierta - Despensa</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Estado del inmueble:</Typography>
                                                    <Typography className='font-medium'>Nuevo</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Comedor:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Sala comedor:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Penthouse:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Patio:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Zona de ropas:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Pisos:</Typography>
                                                    <Typography className='font-medium'>Baldosa</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Hall:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Sala:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Balcón:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Terraza:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Duplex:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Loft:</Typography>
                                                    <Typography className='font-medium'>No</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Puerta de seguridad:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className='flex flex-col gap-4'>
                                            <Typography className='font-medium' color='text.primary'>
                                                Características externas:
                                            </Typography>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Cuarto útil:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Ladrillo a la vista:</Typography>
                                                    <Typography className='font-medium'>Sí</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Cantidad de niveles:</Typography>
                                                    <Typography className='font-medium'>2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>En el piso número:</Typography>
                                                    <Typography className='font-medium'>2</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Otras especificaciones:</Typography>
                                                    <Typography className='font-medium'>Ascencor - En edificio</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Parqueadero:</Typography>
                                                    <Typography className='font-medium'>Cubierto</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Vigilancia:</Typography>
                                                    <Typography className='font-medium'>Portería vigilancia</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Zonas comunes:</Typography>
                                                    <Typography className='font-medium'>Gimnasio</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className='flex flex-col gap-4'>
                                            <Typography className='font-medium' color='text.primary'>
                                                Alrededores:
                                            </Typography>
                                            <div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Otras especificaciones:</Typography>
                                                    <Typography className='font-medium'>Colegios - Universidades</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Lugares de referencia:</Typography>
                                                    <Typography className='font-medium'>Cerca del parque de Laureles</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Otras caracterfisticas:</Typography>
                                                    <Typography className='font-medium'>Ninguna</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Captador:</Typography>
                                                    <Typography className='font-medium'>Pedro Perez</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Medio de captación:</Typography>
                                                    <Typography className='font-medium'>3001234567</Typography>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <Typography className='min-is-[100px]'>Fecha:</Typography>
                                                    <Typography className='font-medium'>10/10/2024</Typography>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>


                            {/* <Grid item xs={12}>
                                <Divider className='border-dashed' />
                            </Grid> */}

                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PropertyDetail
