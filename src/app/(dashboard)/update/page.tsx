'use client';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import * as yup from "yup";
import { useFormik } from "formik";
import CustomTextField from '@core/components/mui/TextField';
import { InputAdornment, IconButton, Button, CircularProgress, Alert, Snackbar } from '@mui/material';
import updatePasswords from '@/app/api/update/password';
import me from '@/app/api/menu/me';
import { useRouter } from 'next/navigation'
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { useHandleRefreshToken } from '@/components/context/RefreshContext';

const SchemaHouseRegister = yup
    .object({
        password: yup.string().required("Escriba su clave").oneOf([yup.ref('passwordConfirm')], 'Las claves deben ser iguales').min(5, "Debe de tener mínimo 5 letras"),
        passwordConfirm: yup.string().required("Escriba de nuevo su clave").oneOf([yup.ref('password')], 'Las claves deben ser iguales').min(5, "Debe de tener mínimo 5 letras"),
    })
    .required();



interface PageProps {
    onSuccess: () => void;
    onMessage?: (message: string) => void;
}

const PasswordUpdate = React.forwardRef<{ submit: () => void }, PageProps>(({ onSuccess }) => {

    const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    const { handleRefreshToken } = useHandleRefreshToken();

    const router = useRouter()

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        handleRefreshToken()
    }, [])


    const formik = useFormik({
        initialValues: {
            password: "",
            passwordConfirm: "",
        },
        enableReinitialize: true,
        validationSchema: SchemaHouseRegister,
        onSubmit: async (data) => {
            try {
                const responseMe = await me()
                if (Object.keys(responseMe.data).length === 0) {
                    Cookies.remove('auth_token')
                    router.push('/login')
                } else {
                    setLoading(true);
                    const responseUpdate = await updatePasswords(responseMe.data.id, data) as AxiosResponse
                    if (responseUpdate.status === 200) {
                        setMessage(responseUpdate.data.message)
                        handleClick();
                        formik.resetForm()
                    }
                }
            } catch (error) {

            } finally {
                setLoading(false);
            }


        },
    });

    return (
        <form onSubmit={formik.handleSubmit} autoComplete='off'>
            <Grid container spacing={8}>
                <Grid item xs={12} md={3}>
                    <CustomTextField
                        fullWidth
                        label='Contraseña'
                        placeholder='Ingrese una contraseña'
                        id='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={isPasswordShown ? 'text' : 'password'}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onClick={() => setIsPasswordShown(!isPasswordShown)}
                                        onMouseDown={e => e.preventDefault()}
                                    >
                                        <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <CustomTextField
                        fullWidth
                        label='Confirmar Contraseña'
                        placeholder='Ingrese de nuevo la contraseña'
                        id='passwordConfirm'
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type={isPasswordConfirmShown ? 'text' : 'password'}
                        helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? formik.errors.passwordConfirm : ''}
                        error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        edge='end'
                                        onClick={() => setIsPasswordConfirmShown(!isPasswordConfirmShown)}
                                        onMouseDown={e => e.preventDefault()}
                                    >
                                        <i className={isPasswordConfirmShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={3} marginTop={'18px'}>
                    <Button
                        fullWidth
                        variant='contained'
                        type='submit'
                        disabled={formik.isSubmitting || loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
                    </Button>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" >
                    {message}
                </Alert>
            </Snackbar>
        </form >
    );
});

export default PasswordUpdate;
