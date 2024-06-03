// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { useProvider } from '@/components/context/Provider'


// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { CustomInputVerticalData } from '@core/components/custom-inputs/types'

// Component Imports
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

// Vars
const data: CustomInputVerticalData[] = [
  {
    title: 'Comercio',
    value: 'comercio',
    asset: 'tabler-building',
    isSelected: true
  },
  {
    title: 'Vivienda',
    value: 'vivienda',
    asset: 'tabler-home-2'
  }
]

const StepCollectionType = ({ activeStep, handleNext, handlePrev, steps }: Props) => {


  const { setGlobalType } = useProvider();

  // Vars
  const initialSelectedOption: string = data.filter(item => item.isSelected)[
    data.filter(item => item.isSelected).length - 1
  ].value

  // States
  const [selectedOption, setSelectedOption] = useState<string>(initialSelectedOption)
  const [date, setDate] = useState<Date | null | undefined>(null)


  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setSelectedOption(prop)
      setGlobalType(prop)

    } else {
      setSelectedOption((prop.target as HTMLInputElement).value)
      setGlobalType((prop.target as HTMLInputElement).value)

    }
  }

  return (
    <Grid container spacing={6}>
      {data.map((item, index) => {
        let asset

        if (item.asset && typeof item.asset === 'string') {
          asset = <i className={classnames(item.asset, 'text-[28px]')} />
        }

        return (
          <CustomInputVertical
            type='radio'
            key={index}
            gridProps={{ sm: 6, xs: 12 }}
            selected={selectedOption}
            name='custom-radios-basic'
            handleChange={handleOptionChange}
            data={typeof item.asset === 'string' ? { ...item, asset } : item}
          />
        )
      })}
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Nombre del propietario' placeholder='Nombre' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Celular del propietario' placeholder='Celular' />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextField fullWidth label='Correo del propietario' placeholder='Correo' />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>¿Autoriza publicar en portales?</FormLabel>
          <RadioGroup row className='gap-2'>
            <FormControlLabel value='si' control={<Radio />} label='Si' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
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
  )
}

export default StepCollectionType
