// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'


// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepSurroundings = ({ activeStep, handleNext, handlePrev, steps }: Props) => {
  // States
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [surroundings, setSurroundings] = useState<string[]>([])


  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={surroundings}
          onChange={(event, value) => setSurroundings(value as string[])}
          id='select-kitchen-details'
          options={['Bombas de gasolina', 'Colegios-universidades']}
          defaultValue={surroundings}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Otras especificaciones' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          rows={4}
          multiline
          label='Mencione lugares de referencia'
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          rows={4}
          multiline
          label='Otras características y observaciones'
        />
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

export default StepSurroundings
