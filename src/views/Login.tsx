'use client'

// React Imports
import { useEffect, useState } from 'react'

// Next Imports
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// MUI Imports
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

// Third-party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'
import classnames from 'classnames'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Login Logic Imports
import login from '@/app/api/login/login'
import Cookies from 'js-cookie'
import axios from 'axios'

const LoginV2 = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // Formik Schema
  const validationSchema = Yup.object({
    email: Yup.string().required("El correo es obligatorio").min(5, "El correo debe de tener mínimo 5 letras").email("Ingresa un correo válido"),
    password: Yup.string().required('La contraseña es obligatoria')
  })

  // Formik Initialization
  const formik = useFormik({
    initialValues: {
      email: 's1@s.com',
      password: '123123'
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const response = await login(values.email, values.password);
        Cookies.set('auth_token', response.data.token);
        const token = Cookies.get('auth_token');
        if (token && token.trim() !== '') {
          router.push('/home');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data.error);
          setMessage(`${error.response?.data.error || 'Error, vuelva a intentar'}`);
          handleClick();
          formik.resetForm()
        }
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }
  });

  const handleClickShowPassword = () => setIsPasswordShown(prev => !prev)

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 900);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token && token.trim() !== '') {
      setIsTokenValid(true);
      router.replace('/home');
    }
  }, [router]);

  if (isTokenValid) {
    return null;
  }

  return (
    <div className='flex bs-full justify-center'>
      <div
        className={classnames(
          'flex bs-full items-center justify-center flex-1 min-bs-[100dvh] relative p-6 max-md:hidden bg-cover bg-center h-screen',
          {
            'border-ie': settings.skin === 'bordered'
          }
        )}
        style={{ backgroundImage: "url(/images/illustrations/auth/piezas-web-Coltebienes.jpg)" }}
      >
      </div>
      <div className='flex justify-center items-center bs-full bg-backgroundPaper !min-is-full p-6 md:!min-is-[unset] md:p-12 md:is-[480px]'>
        <div className='absolute block-start-5 sm:block-start-[33px] inline-start-6 sm:inline-start-[38px]'>

          {isSmallScreen ?
            <Image src='/images/logos/logo_coltebienes.png' width={200} height={68} alt='logo' />
            :
            <Image src='/images/logos/logo_coltebienes_white.png' width={400} height={93} alt='logo' />
          }

        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Bienvenido al dashboard de ${themeConfig.templateName}!`}</Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={formik.handleSubmit}
            className='flex flex-col gap-5'
          >
            <CustomTextField
              autoFocus
              fullWidth
              label='Ingrese el correo'
              name='email'
              placeholder='Ingrese su correo'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <CustomTextField
              fullWidth
              label='Contraseña'
              name='password'
              placeholder='Ingrese la contraseña'
              type={isPasswordShown ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={formik.isSubmitting || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Ingresar'}
            </Button>
          </form>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="error" >
              {message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  )
}

export default LoginV2;
