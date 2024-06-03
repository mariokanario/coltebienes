import { useState } from 'react'
import { useProvider } from '@/components/context/Provider';

// MUI Imports
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'
const comercioDataString = comercioData as Record<string, any>


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const StepExternalFeatures = ({ activeStep, handleNext, handlePrev, steps }: Props) => {

  const { globalType } = useProvider();
  const [front, setFront] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])
  const [commonZones, setCommonZones] = useState<string[]>([])



  return (
    <>
      <Grid container spacing={6}>

        {
          globalType == "comercio" ?
            <>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Parque industrial</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Bahia de parqueo</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Baños comunales</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Baños públicos</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Muelle a nivel</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Muelle deprimido</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Capacidad de carga de t/m² del piso</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Puente grúa</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Cuarto útil</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Acceso digital en edificio</FormLabel>
                  <RadioGroup row className='gap-3' >
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={12}>
                <hr className="w-full h-px bg-gray-100" />
              </Grid>


              <Grid item xs={12} md={6}>
                <CustomAutocomplete
                  fullWidth
                  multiple
                  value={front}
                  onChange={(event, value) => setFront(value as string[])}
                  id='select-kitchen-details'
                  options={
                    comercioDataString[globalType].Externo["Fachada"].map((tipo: string) => (tipo))
                  }
                  defaultValue={front}
                  getOptionLabel={option => option || ''}
                  renderInput={params => <CustomTextField {...params} label='Fachada' />}
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                    ))
                  }
                />
              </Grid>

              <Grid item xs={10} md={4}>
                <CustomTextField
                  select
                  fullWidth
                  label='Energía'
                  aria-describedby='energia'
                  defaultValue=''
                >
                  <MenuItem value=''>Selecciones vía</MenuItem>
                  {
                    comercioDataString[globalType].Externo['Energía'].map((tipo: string) => (
                      <MenuItem value={tipo}> {tipo} </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>

              <Grid item xs={2} md={2}>
                <CustomTextField type='number' fullWidth label='Cantidad' disabled />
              </Grid>

            </>

            :

            <>
              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Cuarto útil</FormLabel>
                  <RadioGroup row className='gap-3'>
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
                  <FormLabel>Ladrillo a la vista</FormLabel>
                  <RadioGroup row className='gap-3'>
                    <FormControlLabel value='si' control={<Radio />} label='Si' />
                    <FormControlLabel value='no' control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
        }

        <Grid item xs={12} md={6}>
          <CustomTextField type='number' fullWidth label='Cantidad de niveles' />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField type='number' fullWidth label='En el piso número' />
        </Grid>

        <Grid item xs={12} md={12}>
          <CustomAutocomplete
            fullWidth
            multiple
            value={specifications}
            onChange={(event, value) => setSpecifications(value as string[])}
            id='select-kitchen-details'
            options={
              comercioDataString[globalType].Externo["Otras especificaciones"].map((tipo: string) => (tipo))
            }
            defaultValue={specifications}
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
          <CustomTextField
            select
            fullWidth
            label='Parqueadero'
            aria-describedby='parqueadero'
            defaultValue=''
          >
            <MenuItem value=''>Seleccione parqueadero</MenuItem>
            {
              comercioDataString[globalType].Externo['Parqueadero'].map((tipo: string) => (
                <MenuItem value={tipo}> {tipo} </MenuItem>
              ))
            }
          </CustomTextField>
        </Grid>

        {
          globalType == "comercio" ?
            <Grid item xs={12} md={6}>
              <CustomTextField
                select
                fullWidth
                label='Unidad'
                aria-describedby='unidad'
                defaultValue=''
              >
                <MenuItem value=''>Seleccione unidad</MenuItem>
                {
                  comercioDataString[globalType].Externo['Unidad'].map((tipo: string) => (
                    <MenuItem value={tipo}> {tipo} </MenuItem>
                  ))
                }
              </CustomTextField>
            </Grid>
            : null
        }
        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            value={watch}
            onChange={(event, value) => setWatch(value as string[])}
            id='select-kitchen-details'
            options={
              comercioDataString[globalType].Externo["Vigilancia"].map((tipo: string) => (tipo))
            }
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

        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            value={commonZones}
            onChange={(event, value) => setCommonZones(value as string[])}
            id='select-kitchen-details'
            options={
              comercioDataString[globalType].Externo["Zonas comunes"].map((tipo: string) => (tipo))
            }
            defaultValue={commonZones}
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Zonas comunes' />}
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
    </>
  )
}

export default StepExternalFeatures
