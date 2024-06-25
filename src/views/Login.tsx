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
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// Third-party Imports
import classnames from 'classnames'

// Component Imports
import Link from '@components/Link'
import CustomTextField from '@core/components/mui/TextField'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'



const LoginV2 = () => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)


  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const checkScreenSize = () => {
    if (window.innerWidth < 900) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  // Hooks
  const router = useRouter()
  const { settings } = useSettings()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);

  });



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

          {
            isSmallScreen ?
              <Image src='/images/logos/logo_coltebienes.png' width={200} height={68} alt='logo' />
              :
              <Image src='/images/logos/logo_coltebienes_white.png' width={400} height={93} alt='logo' />
          }

        </div>
        <div className='flex flex-col gap-6 is-full sm:is-auto md:is-full sm:max-is-[400px] md:max-is-[unset] mbs-11 sm:mbs-14 md:mbs-0'>
          <div className='flex flex-col gap-1'>
            <Typography variant='h4'>{`Bienvenido al dashboard de ${themeConfig.templateName}!`}</Typography>
            <Typography>El ingreso es solo para administradores</Typography>
          </div>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              router.push('/')
            }}
            className='flex flex-col gap-5'
          >
            <CustomTextField autoFocus fullWidth label='Email or Username' placeholder='Enter your email or username' />
            <CustomTextField
              fullWidth
              label='Password'
              placeholder='············'
              id='outlined-adornment-password'
              type={isPasswordShown ? 'text' : 'password'}
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
            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
              <FormControlLabel control={<Checkbox />} label='Recordarme' />
              <Typography className='text-end' color='primary' component={Link}>
                Olvido su contraseña?
              </Typography>
            </div>
            <Button fullWidth variant='contained' type='submit'>
              Login
            </Button>

          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
