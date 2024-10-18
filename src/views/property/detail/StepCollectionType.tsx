// React Imports
import { useEffect, useState, type ChangeEvent } from 'react';

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
import { formDataInterface } from '@/components/context/FormDataInterface';
import { useAlert } from '@/components/AlertContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import detail from '@/app/api/captaciones/detail'
import { initialFormData, useForm } from '@/components/context/FormContext';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import getPhotos from '@/app/api/captaciones/getPhotos';


type Props = {
    activeStep: number
    handleNext: () => void
    handlePrev: () => void
    steps: { title: string; subtitle: string }[]
    id: string
}

interface Image {
    id: number;
    base64: string;
    title: string;
    path: string;
}


const StepCollectionType = ({ activeStep, handleNext, handlePrev, steps, id }: Props) => {

    const { globalType, setGlobalType } = useProvider()
    const { formData, setFormData } = useForm()
    const { showMessage } = useAlert()
    const router = useRouter()
    const [images, setImages] = useState<Image[]>([])

    const [open, setOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    const handleClickOpen = (imageSrc: any) => {
        setSelectedImage(imageSrc)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
        setSelectedImage('')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response, responseImages] = await Promise.all([detail(id), getPhotos(id)]);

                if (response.status === 200) {
                    setFormData(response.data[0]);
                    setImages(responseImages.data);
                } else {
                    handleServerError();
                }
            } catch (error: any) {
                handleFetchError(error);
            }
        };

        const handleServerError = () => {
            showMessage("Error del servidor, por favor intenta nuevamente más tarde.", "error");
            Cookies.remove("auth_token");
            router.push("/login");
        };

        const handleFetchError = (error: any) => {
            console.error("Error al obtener datos:", error);
            showMessage("Error al obtener datos, por favor intenta nuevamente.", "error");
            Cookies.remove("auth_token");
            router.push("/login");
        };

        fetchData();
    }, [id]);

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
                                        {formData.id}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Tipo</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.globaltype
                                            ? formData.globaltype.charAt(0).toUpperCase() + formData.globaltype.slice(1)
                                            : ''}
                                    </Typography>

                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Nombre del propietario</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.name}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Celular del propietario</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.cellphone}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Correo</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.owner_email}
                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Tipo de contacto</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.type_contact?.length ? (
                                            formData.type_contact.map((element, index) => (
                                                <Typography key={index} color="text.primary" sx={{ fontWeight: 'bold', display: 'block' }}>
                                                    {element}
                                                </Typography>
                                            ))
                                        ) : (
                                            <Typography color="text.primary">No contact types available</Typography>
                                        )}

                                    </Typography>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Typography color='text.primary'>Autoriza publicar en portales</Typography>
                                </td>
                                <td>
                                    <Typography color='text.primary' sx={{ fontWeight: 'bold' }}>
                                        {formData.authorizes_publishing
                                            ? formData.authorizes_publishing.charAt(0).toUpperCase() + formData.authorizes_publishing.slice(1)
                                            : ''}
                                    </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Grid>
            <Grid
                item
                className='gridImages'
                xs={12}
                lg={9}
                sx={{ width: '100px' }}
            >
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={1}
                    slidesPerView={2}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {images.length > 0 ? (
                        images.map((image) => (
                            <SwiperSlide key={image.id} onClick={() => handleClickOpen(image.base64)}>
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        objectFit: 'cover',
                                        cursor: 'pointer',
                                    }}
                                    className="standard-image"
                                    src={image.base64}
                                    alt={image.title}
                                    onError={() => console.log('Error loading image', image.base64)}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <div>Debes pasar la captacion a propiedad para subir imagenes.</div>
                    )}
                </Swiper>
            </Grid>

            {/* Modal para ver imagen más grande */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <img className='w-full' src={selectedImage} alt="Imagen Ampliada" />
                </DialogContent>
            </Dialog>

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
