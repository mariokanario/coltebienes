// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI IMports
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'


// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'



type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}



// Vars


const StepCollectionData = ({ activeStep, handleNext, handlePrev, steps }: Props) => {

  const [date, setDate] = useState<Date | null | undefined>(null)

  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            placeholder='25,000'
            label='Canon'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <i className='tabler-currency-dollar' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            placeholder='25,000.000'
            label='Valor venta'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <i className='tabler-currency-dollar' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            placeholder='25,000.000'
            label='Valor administración'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <i className='tabler-currency-dollar' />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl>
            <FormLabel>¿Está incluida?</FormLabel>
            <RadioGroup row defaultValue='si' className='gap-2'>
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <hr className="w-full h-px bg-gray-100" />
        </Grid>


        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            label='Área construida'
            placeholder='100'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='text-textDisabled'>
                  mt2
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            label='Área privada'
            placeholder='100'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='text-textDisabled'>
                  mt2
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppReactDatepicker
            selected={date}
            placeholderText='YYYY-MM-DD'
            dateFormat={'yyyy-MM-dd'}
            onChange={(date: Date) => setDate(date)}
            customInput={<CustomTextField fullWidth label='Año de construcción' />}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <hr className="w-full h-px bg-gray-100" />
        </Grid>

        {/* DIRECCIÓN */}



        <Grid item xs={12} md={6}>
          <CustomTextField fullWidth label='Ciudad' placeholder='Medellín' />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField fullWidth label='Barrio' placeholder='Laureles' />
        </Grid>

        <Grid item xs={12} md={12}>
          <CustomTextField fullWidth label='Dirección' placeholder='La dirección se completará una vez diligencie los campos de este formulario ' inputProps={{ readOnly: true }} />
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Tipo de vía'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''>Selecciones vía</MenuItem>
            <MenuItem value='Calle'>Calle</MenuItem>
            <MenuItem value='Carrera'>Carrera</MenuItem>
            <MenuItem value='Circular'>Circular</MenuItem>
            <MenuItem value='Cincunvalar'>Cincunvalar</MenuItem>
            <MenuItem value='Diagonal'>Diagonal</MenuItem>
            <MenuItem value='Transversal'>Transversal</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField fullWidth type='number' label='Número' />
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='C'>C</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='C'>C</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Sentido'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='Este'>Este</MenuItem>
            <MenuItem value='Norte'>Norte</MenuItem>
            <MenuItem value='Oeste'>Oeste</MenuItem>
            <MenuItem value='Sur'>Sur</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField fullWidth type='number' label='Número' />
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='C'>C</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='A'>A</MenuItem>
            <MenuItem value='B'>B</MenuItem>
            <MenuItem value='C'>C</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Sentido'
            aria-describedby='country-select'
            defaultValue=''
          >
            <MenuItem value=''></MenuItem>
            <MenuItem value='Este'>Este</MenuItem>
            <MenuItem value='Norte'>Norte</MenuItem>
            <MenuItem value='Oeste'>Oeste</MenuItem>
            <MenuItem value='Sur'>Sur</MenuItem>
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField fullWidth type='number' label='Número' />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField fullWidth label='Nombre de la copropiedad' />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomTextField fullWidth type='number' label='Número de baños' />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomTextField fullWidth type='number' label='Número de parqueaderos' />
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
              color={activeStep === steps.length - 1 ? 'success' : 'primary'}
              onClick={handleNext}
              endIcon={
                activeStep === steps.length - 1 ? (
                  <i className='tabler-check' />
                ) : (
                  <DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                )
              }
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Siguiente'}
            </Button>
          </div>
        </Grid>


      </Grid>
    </>
  )
}

export default StepCollectionData
