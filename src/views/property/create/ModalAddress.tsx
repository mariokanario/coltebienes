// React Imports
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// MUI Imports
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import MapView from './MapView'
import { useForm } from '@/components/context/FormContext'

type Props = {
    open: boolean
    handleClose: () => void
    hadleSetAddress: (address: string) => void
}

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const coordinates = ['Este', 'Norte', 'Oeste', 'Sur']

const validationSchema = Yup.object({
    input1: Yup.string().required('Requerido'),
    input2: Yup.number().min(0, 'Número no puede ser negativo').required('Requerido'),
    input3: Yup.string().required('Requerido'),
    input4: Yup.string().required('Requerido'),
    input5: Yup.string().required('Requerido'),
    input6: Yup.number().min(0, 'Número no puede ser negativo').required('Requerido'),
    input7: Yup.string().required('Requerido'),
    input8: Yup.string().required('Requerido'),
    input9: Yup.string().required('Requerido'),
    input10: Yup.number().min(0, 'Número no puede ser negativo').required('Requerido')
})

const ModalAddress = ({ open, handleClose, hadleSetAddress }: Props) => {
    const [viewMap, setViewMap] = useState<boolean>(false)
    const [combinedAddressMaps, setCombinedAddressMaps] = useState('')


    const formik = useFormik({
        initialValues: {
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            input5: '',
            input6: '',
            input7: '',
            input8: '',
            input9: '',
            input10: ''
        },
        //validationSchema,
        onSubmit: (values) => {
            const combinedAddress = Object.values(values).join(' ')
            hadleSetAddress(combinedAddress)
            handleClose()
        }
    })

    useEffect(() => {
        const addressMaps = formik.values.input1 + " " +
            formik.values.input2 + formik.values.input3 + formik.values.input4 + " " +
            formik.values.input5 + " # " +
            formik.values.input6 + formik.values.input7 + formik.values.input8 + formik.values.input9 + " - " +
            formik.values.input10
        setCombinedAddressMaps(addressMaps)
        setViewMap(false)
    }, [formik.values])

    const combinedAddress = Object.values(formik.values).join(' ')

    function clearForm(): void {
        formik.resetForm()
    }


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'md'} fullWidth>
            <DialogContent>
                <DialogContentText className='mbe-3'>
                    <form onSubmit={formik.handleSubmit} autoComplete='off'>
                        <Grid container spacing={12}>

                            <Grid item xs={12} md={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Dirección'
                                    placeholder='La dirección se completará una vez diligencie los campos de este formulario'
                                    inputProps={{ readOnly: true }}
                                    id="addressbuild"
                                    value={combinedAddress}
                                />
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Tipo de vía'
                                    aria-describedby='country-select'
                                    value={formik.values.input1}
                                    name='input1'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input1 && Boolean(formik.errors.input1)}
                                    helperText={formik.touched.input1 && formik.errors.input1}
                                >
                                    <MenuItem value=''>Seleccione vía</MenuItem>
                                    <MenuItem value='Calle'>Calle</MenuItem>
                                    <MenuItem value='Carrera'>Carrera</MenuItem>
                                    <MenuItem value='Circular'>Circular</MenuItem>
                                    <MenuItem value='Cincunvalar'>Cincunvalar</MenuItem>
                                    <MenuItem value='Diagonal'>Diagonal</MenuItem>
                                    <MenuItem value='Transversal'>Transversal</MenuItem>
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={formik.values.input2}
                                    name='input2'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input2 && Boolean(formik.errors.input2)}
                                    helperText={formik.touched.input2 && formik.errors.input2}
                                />
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    value={formik.values.input3}
                                    name='input3'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input3 && Boolean(formik.errors.input3)}
                                    helperText={formik.touched.input3 && formik.errors.input3}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {alphabet.map((a) => (
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    value={formik.values.input4}
                                    name='input4'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input4 && Boolean(formik.errors.input4)}
                                    helperText={formik.touched.input4 && formik.errors.input4}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {alphabet.map((a) => (
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Sentido'
                                    value={formik.values.input5}
                                    name='input5'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input5 && Boolean(formik.errors.input5)}
                                    helperText={formik.touched.input5 && formik.errors.input5}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {coordinates.map((c) => (
                                        <MenuItem key={c} value={c}>{c}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={formik.values.input6}
                                    name='input6'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input6 && Boolean(formik.errors.input6)}
                                    helperText={formik.touched.input6 && formik.errors.input6}
                                />
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    value={formik.values.input7}
                                    name='input7'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input7 && Boolean(formik.errors.input7)}
                                    helperText={formik.touched.input7 && formik.errors.input7}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {alphabet.map((a) => (
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    value={formik.values.input8}
                                    name='input8'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input8 && Boolean(formik.errors.input8)}
                                    helperText={formik.touched.input8 && formik.errors.input8}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {alphabet.map((a) => (
                                        <MenuItem key={a} value={a}>{a}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Sentido'
                                    value={formik.values.input9}
                                    name='input9'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input9 && Boolean(formik.errors.input9)}
                                    helperText={formik.touched.input9 && formik.errors.input9}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {coordinates.map((c) => (
                                        <MenuItem key={c} value={c}>{c}</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    value={formik.values.input10}
                                    name='input10'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.input10 && Boolean(formik.errors.input10)}
                                    helperText={formik.touched.input10 && formik.errors.input10}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} style={{ paddingTop: '1.5rem' }}>
                                <Button variant='contained' onClick={() => setViewMap(!viewMap)} startIcon={<i className='tabler-map-pin' />}>Ubicar mapa</Button>
                                <Button style={{ marginLeft: '20px' }} variant='contained' onClick={() => clearForm()} >Limpiar campos</Button>
                            </Grid>
                            {viewMap &&
                                <Grid item xs={12} md={12} style={{ paddingTop: '1.5rem' }}>
                                    <MapView address={combinedAddressMaps} />
                                </Grid>
                            }
                        </Grid>
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit" variant='contained' onClick={() => formik.handleSubmit()}>Agregar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalAddress
