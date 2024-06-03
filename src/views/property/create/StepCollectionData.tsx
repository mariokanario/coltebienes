// React Imports
import { useEffect, useState, ChangeEvent } from 'react'
import { useProvider } from '@/components/context/Provider';

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

import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'
import colombiaData from '@/app/api/fake-db/apps/form-list/colombiaData.json'
const comercioDataString = comercioData as Record<string, any>

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

interface InputValues {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  input7: string;
  input8: string;
  input9: string;
  input10: string;
}

interface Department {
  nombre: string;
  ciudades: string[];
}

const StepCollectionData = ({ activeStep, handleNext, handlePrev, steps }: Props) => {

  const { globalType } = useProvider();
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');

  const [address, setAddress] = useState<InputValues>({
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
  });
  const [combinedString, setCombinedString] = useState<string>('');

  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const coordinates = ['Este', 'Norte', 'Oeste', 'Sur']

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const department: Department | undefined = colombiaData.departamentos.find(
      (dept: Department) => dept.nombre === selectedDepartment
    );
    if (department) {
      setCities(department.ciudades);
    } else {
      setCities([]);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    const newCombinedString = Object.values(address).join(' ');
    setCombinedString(newCombinedString);
  }, [address]);

  return (
    <>
      <Grid container spacing={6}>

        <Grid item xs={6} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Departamento'
            defaultValue=''
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <MenuItem value=''></MenuItem>
            {colombiaData.departamentos.map((dept: Department) => (
              <MenuItem key={dept.nombre} value={dept.nombre}>
                {dept.nombre}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Ciudad'
            defaultValue=''
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <MenuItem value=''></MenuItem>
            {cities.map((city: string) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>



        <Grid item xs={12} md={6}>
          <CustomTextField fullWidth label='Barrio' placeholder='Laureles' />
        </Grid>

        <Grid item xs={12} md={12}>
          <hr className="w-full h-px bg-gray-100" />
        </Grid>

        {/* DIRECCIÓN */}

        <Grid item xs={12} md={12}>
          <CustomTextField fullWidth label='Dirección' placeholder='La dirección se completará una vez diligencie los campos de este formulario ' inputProps={{ readOnly: true }} defaultValue={combinedString} />
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Tipo de vía'
            aria-describedby='country-select'
            defaultValue=''
            name='input1'
            onChange={handleAddress}
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
          <CustomTextField
            fullWidth type='number'
            label='Número'
            InputProps={{ inputProps: { min: 0 } }}
            name='input2'
            onChange={handleAddress} />

        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            defaultValue=''
            name='input3'
            onChange={handleAddress}
          >
            <MenuItem value=''></MenuItem>
            {
              alphabet.map((a: string) =>
                <MenuItem value={a}>{a}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
            name='input4'
            onChange={handleAddress}
          >

            <MenuItem value=''></MenuItem>
            {
              alphabet.map((a: string) =>
                <MenuItem value={a}>{a}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Sentido'
            aria-describedby='country-select'
            defaultValue=''
            name='input5'
            onChange={handleAddress}
          >
            <MenuItem value=''></MenuItem>
            {
              coordinates.map((c: string) =>
                <MenuItem value={c}>{c}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            fullWidth
            type='number'
            label='Número'
            InputProps={{ inputProps: { min: 0 } }}
            name='input6'
            onChange={handleAddress}
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
            name='input7'
            onChange={handleAddress}
          >
            <MenuItem value=''></MenuItem>
            {
              alphabet.map((a: string) =>
                <MenuItem value={a}>{a}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={2}>
          <CustomTextField
            select
            fullWidth
            label='Letra'
            aria-describedby='country-select'
            defaultValue=''
            name='input8'
            onChange={handleAddress}
          >
            <MenuItem value=''></MenuItem>
            {
              alphabet.map((a: string) =>
                <MenuItem value={a}>{a}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            select
            fullWidth
            label='Sentido'
            aria-describedby='country-select'
            defaultValue=''
            name='input9'
            onChange={handleAddress}
          >
            <MenuItem value=''></MenuItem>
            {
              coordinates.map((c: string) =>
                <MenuItem value={c}>{c}</MenuItem>
              )
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={6} md={3}>
          <CustomTextField
            fullWidth
            type='number'
            label='Número'
            InputProps={{ inputProps: { min: 0 } }}
            name='input10'
            onChange={handleAddress}
          />
        </Grid>

        {/* Fin dirección */}

        <Grid item xs={12} md={12}>
          <hr className="w-full h-px bg-gray-100" />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField fullWidth label='Nombre de la copropiedad' />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField select fullWidth label='Tipo de inmueble' id='validation-property-select' defaultValue=''>
            {comercioDataString[globalType].Datos['Tipo de inmueble'].map((tipo: string) => (
              <MenuItem value={tipo}> {tipo} </MenuItem>
            ))}

          </CustomTextField>
        </Grid>

        {
          globalType == "vivienda" ?
            <Grid item xs={12} md={6}>
              <CustomTextField select fullWidth label='Destinación' id='validation-property-select' defaultValue=''>
                {comercioDataString[globalType].Datos['Destinacion'].map((tipo: string) => (
                  <MenuItem value={tipo}> {tipo} </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            : null
        }


        <Grid item xs={12} md={6}>
          <CustomTextField select fullWidth label='Encargo' id='validation-property-charge' defaultValue=''>
            {comercioDataString[globalType].Datos['Encargo'].map((tipo: string) => (
              <MenuItem value={tipo}> {tipo} </MenuItem>
            ))}
          </CustomTextField>
        </Grid>


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
              ),
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            placeholder='25,000'
            label='Valor venta'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <i className='tabler-currency-dollar' />
                </InputAdornment>
              ),
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
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
              ),
              inputProps: { min: 0 }
            }}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl>
            <FormLabel>¿Está incluida?</FormLabel>
            <RadioGroup row className='gap-2'>
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
              ),
              inputProps: { min: 0 }
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

        {
          globalType == "vivienda" ?
            <Grid item xs={12} md={6}>
              <CustomTextField fullWidth type='number' label='Estrato' InputProps={{ inputProps: { min: 0 } }} />
            </Grid>
            : null
        }

        <Grid item xs={12} md={12}>
          <hr className="w-full h-px bg-gray-100" />
        </Grid>


        {
          globalType == "vivienda" ?
            <Grid item xs={12} md={3}>
              <CustomTextField fullWidth type='number' label='Número de habitaciones' InputProps={{ inputProps: { min: 0 } }} />
            </Grid>
            : null
        }
        <Grid item xs={12} md={3}>
          <CustomTextField fullWidth type='number' label='Número de baños' InputProps={{ inputProps: { min: 0 } }} />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomTextField fullWidth type='number' label='Número de parqueaderos' InputProps={{ inputProps: { min: 0 } }} />
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
