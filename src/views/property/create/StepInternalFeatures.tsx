// React Imports
import { useState } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'


// Component Imports
import CustomAutocomplete from '@core/components/mui/Autocomplete'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'

// import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepInternalFeatures = ({ activeStep, handleNext, handlePrev, steps }: Props) => {

  // States
  const [kitchenDetails, setKitchenDetails] = useState<string[]>([])
  const [propertyStatus, setPropertyStatus] = useState<string[]>([])
  const [otherSpecifications, setOtherSpecifications] = useState<string[]>([])
  const [floors, setFloors] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])


  return (
    <Grid container spacing={6}>

      <Grid item xs={12} md={6}>
        <CustomTextField select fullWidth id='demo-simple-select' label='Acabados cubierta' defaultValue=''>
          <MenuItem value=''>Seleccione acabados cubierta</MenuItem>
          <MenuItem value='Teja eternit'>Teja eternit</MenuItem>
        </CustomTextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          type='number'
          label='Altura en metros'
          placeholder='3'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' className='text-textDisabled'>
                mt
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          type='number'
          label='Fondo en metros'
          placeholder='3'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' className='text-textDisabled'>
                mt
              </InputAdornment>
            )
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextField
          fullWidth
          type='number'
          label='Frente en metros'
          placeholder='3'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end' className='text-textDisabled'>
                mt
              </InputAdornment>
            )
          }}
        />
      </Grid>



      <Grid item xs={12} md={6}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={kitchenDetails}
          onChange={(event, value) => setKitchenDetails(value as string[])}
          id='select-kitchen-details'
          options={['Cocineta', 'Gas natural']}
          defaultValue={kitchenDetails}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Cocina' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
        />
      </Grid>


      <Grid item xs={12} md={6}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={propertyStatus}
          onChange={(event, value) => setPropertyStatus(value as string[])}
          id='select-kitchen-details'
          options={['Bueno', 'En construcción']}
          defaultValue={propertyStatus}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Estado del inmueble' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
        />
      </Grid>


      <Grid item xs={12} md={6}>
        <CustomTextField select fullWidth id='demo-simple-select' label='Energía' defaultValue=''>
          <MenuItem value=''>Seleccione estado</MenuItem>
          <MenuItem value='Cocineta'>Monofásica</MenuItem>
        </CustomTextField>
      </Grid>


      <Grid item xs={12} md={6}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={otherSpecifications}
          onChange={(event, value) => setOtherSpecifications(value as string[])}
          id='select-kitchen-details'
          options={['Cableado de red', 'Cableado estructurado']}
          defaultValue={otherSpecifications}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Otras especificaciones' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={floors}
          onChange={(event, value) => setFloors(value as string[])}
          id='select-kitchen-details'
          options={['Adoquín ', 'Baldosa']}
          defaultValue={floors}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Otras especificaciones' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
        />
      </Grid>



      <Grid item xs={12} md={6}>
        <CustomTextField select fullWidth id='demo-simple-select' label='Tipo de bodega' defaultValue=''>
          <MenuItem value=''>Seleccione tipo de bodega</MenuItem>
          <MenuItem value='Cocineta'>Bueno</MenuItem>
        </CustomTextField>
      </Grid>

      <Grid item xs={6} md={6}>
        <FormControl>
          <FormLabel>Balcón</FormLabel>
          <RadioGroup row className='gap-3'>
            <FormControlLabel value='si' control={<Radio />} label='Si' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Terraza</FormLabel>
          <RadioGroup row className='gap-3'>
            <FormControlLabel value='si' control={<Radio />} label='Si' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Aire acondicionado</FormLabel>
          <RadioGroup row className='gap-3'>
            <FormControlLabel value='si' control={<Radio />} label='Si' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl>
          <FormLabel>Aire central</FormLabel>
          <RadioGroup row className='gap-3'>
            <FormControlLabel value='si' control={<Radio />} label='Si' />
            <FormControlLabel value='no' control={<Radio />} label='No' />
          </RadioGroup>
        </FormControl>
      </Grid>


      <Grid item xs={12} md={6}>
        <CustomAutocomplete
          fullWidth
          multiple
          value={watch}
          onChange={(event, value) => setWatch(value as string[])}
          id='select-kitchen-details'
          options={['Circuito cerrado ', 'Puerta de seguridad']}
          defaultValue={watch}
          getOptionLabel={option => option || ''}
          renderInput={params => <CustomTextField {...params} label='Vigilancia' />}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
            ))
          }
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

export default StepInternalFeatures
