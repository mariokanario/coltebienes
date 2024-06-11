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
import FormHelperText from '@mui/material/FormHelperText'

import * as yup from "yup";
import { useFormik } from "formik";


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

const SchemaHouse = yup
  .object({
    department: yup.string().required("Elije una opción"),
    city: yup.string().required("Elije una opción"),
    neighborhood: yup.string().required("Escriba el barrio").min(5, "Debe de tener mínimo 5 letras"),
    coownershipname: yup.string().required("Escriba el nombre").min(5, "Debe de tener mínimo 5 letras"),
    propertytype: yup.string().required("Elije una opción"),
    destination: yup.string().required("Elije una opción"),
    charge: yup.string().required("Elije una opción"),
    canyon: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    salevalue: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    adminvalue: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    builtarea: yup.number().required("Agregue un área"),
    privatearea: yup.string().required("Agregue un área"),
    yearconstruction: yup.date().required("Agregue una fecha").nullable().transform((value, originalValue) => (originalValue === '' ? null : value)),
    stratum: yup.string().required("Agregue un valor"),
    roomsnum: yup.string().required("Agregue un valor"),
    bathroomnum: yup.string().required("Agregue un valor"),
    garagenum: yup.string().required("Agregue un valor"),
  })
  .required();

const SchemaBuild = yup
  .object({
    department: yup.string().required("Elije una opción"),
    city: yup.string().required("Elije una opción"),
    neighborhood: yup.string().required("Escriba el barrio").min(5, "Debe de tener mínimo 5 letras"),
    coownershipname: yup.string().required("Escriba el nombre").min(5, "Debe de tener mínimo 5 letras"),
    propertytype: yup.string().required("Elije una opción"),
    charge: yup.string().required("Elije una opción"),
    canyon: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    salevalue: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    adminvalue: yup.string().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    builtarea: yup.string().required("Agregue un área"),
    privatearea: yup.string().required("Agregue un área"),
    yearconstruction: yup.date().required("Agregue una fecha"),
    bathroomnum: yup.string().required("Agregue un valor"),
    garagenum: yup.string().required("Agregue un valor"),
  })
  .required();

const StepCollectionData = ({ activeStep, handleNext, handlePrev, steps }: Props) => {


  const { globalType } = useProvider();
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const validationSchemaVar = globalType === "vivienda" ? SchemaHouse : SchemaBuild;

  const [address, setAddress] = useState<InputValues>({
    input1: ' ',
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

  const initialValues = globalType === "vivienda" ?
    {
      department: '',
      city: '',
      neighborhood: '',
      coownershipname: '',
      propertytype: '',
      destination: '',
      charge: '',
      canyon: '',
      salevalue: '',
      adminvalue: '',
      adminincluded: '',
      builtarea: '',
      privatearea: '',
      yearconstruction: '',
      stratum: '',
      roomsnum: '',
      bathroomnum: '',
      garagenum: '',
      addressbuild: '',
    }
    :
    {
      department: '',
      city: '',
      neighborhood: '',
      coownershipname: '',
      propertytype: '',
      charge: '',
      canyon: '',
      salevalue: '',
      adminvalue: '',
      adminincluded: '',
      builtarea: '',
      privatearea: '',
      yearconstruction: '',
      bathroomnum: '',
      garagenum: '',
      addressbuild: '',
    }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaVar,
    onSubmit: (data) => {
      console.log(data);

    },
  });


  const { department, city, neighborhood, addressbuild, coownershipname, propertytype, destination, charge, canyon, salevalue, adminvalue, adminincluded, builtarea, privatearea, yearconstruction, stratum, roomsnum, bathroomnum, garagenum, } = formik.values;


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
    // addresFunction()
  }, [address]);

  const addresFunction = () => {
    const adval = Object.values(address).some(item => item !== "")

  }


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={6}>

          <Grid item xs={6} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Departamento'
              defaultValue=''
              name="department"
              value={formik.values.department}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              helperText={formik.touched.department && formik.errors.department ? formik.errors.department : ''}
              error={formik.touched.department && Boolean(formik.errors.department)}
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
              name="city"
              value={formik.values.city}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              helperText={formik.touched.city && formik.errors.city ? formik.errors.city : ''}
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <MenuItem value=''></MenuItem>
              {cities.map((cit: string) => (
                <MenuItem key={cit} value={cit}>
                  {cit}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>



          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label='Barrio'
              placeholder='Laureles'
              id="neighborhood"
              value={neighborhood}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.neighborhood && formik.errors.neighborhood ? formik.errors.neighborhood : ''}
              error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <hr className="w-full h-px bg-gray-100" />
          </Grid>

          {/* DIRECCIÓN */}

          <Grid item xs={12} md={12}>
            <CustomTextField
              fullWidth
              label='Dirección'
              placeholder='La dirección se completará una vez diligencie los campos de este formulario'
              inputProps={{ readOnly: true }}
              // defaultValue={combinedString}
              id="addressbuild"
              value={combinedString}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={!(Object.values(address).some(item => item !== "")) ? formik.errors.addressbuild : ''}
              error={!(Object.values(address).some(item => item !== ""))}
            />
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
            <CustomTextField
              fullWidth
              label='Nombre de la copropiedad'
              id="coownershipname"
              value={coownershipname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.coownershipname && formik.errors.coownershipname ? formik.errors.coownershipname : ''}
              error={formik.touched.coownershipname && Boolean(formik.errors.coownershipname)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Tipo de inmueble'
              id='propertytype'
              defaultValue=''
              name="propertytype"
              value={formik.values.propertytype}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.propertytype && formik.errors.propertytype ? formik.errors.propertytype : ''}
              error={formik.touched.propertytype && Boolean(formik.errors.propertytype)}
            >
              {comercioDataString[globalType].Datos['Tipo de inmueble'].map((tipo: string) => (
                <MenuItem value={tipo}> {tipo} </MenuItem>
              ))}

            </CustomTextField>
          </Grid>

          {
            globalType == "vivienda" ?
              <Grid item xs={12} md={6}>
                <CustomTextField
                  select
                  fullWidth
                  label='Destinación'
                  id='destination'
                  defaultValue=''
                  name="destination"
                  value={formik.values.destination}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.destination && formik.errors.destination ? formik.errors.destination : ''}
                  error={formik.touched.destination && Boolean(formik.errors.destination)}
                >
                  {comercioDataString[globalType].Datos['Destinacion'].map((tipo: string) => (
                    <MenuItem value={tipo}> {tipo} </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              : null
          }


          <Grid item xs={12} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Encargo'
              id='charge'
              defaultValue=''
              name="charge"
              value={formik.values.charge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.charge && formik.errors.charge ? formik.errors.charge : ''}
              error={formik.touched.charge && Boolean(formik.errors.charge)}
            >
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
              id="canyon"
              value={formik.values.canyon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.canyon && formik.errors.canyon ? formik.errors.canyon : ''}
              error={formik.touched.canyon && Boolean(formik.errors.canyon)}
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
              id="salevalue"
              value={formik.values.salevalue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.salevalue && formik.errors.salevalue ? formik.errors.salevalue : ''}
              error={formik.touched.salevalue && Boolean(formik.errors.salevalue)}
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
              id="adminvalue"
              value={formik.values.adminvalue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.adminvalue && formik.errors.adminvalue ? formik.errors.adminvalue : ''}
              error={formik.touched.adminvalue && Boolean(formik.errors.adminvalue)}
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
              <RadioGroup
                row
                className='gap-2'
                name='adminincluded'
                value={formik.values.adminincluded}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
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
              id="builtarea"
              value={formik.values.builtarea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.builtarea && formik.errors.builtarea ? formik.errors.builtarea : ''}
              error={formik.touched.builtarea && Boolean(formik.errors.builtarea)}
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
              id="privatearea"
              value={formik.values.privatearea}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.privatearea && formik.errors.privatearea ? formik.errors.privatearea : ''}
              error={formik.touched.privatearea && Boolean(formik.errors.privatearea)}
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
              id="yearconstruction"
              value={formik.values.yearconstruction || ''}
              onChange={(date: Date | null) => {
                formik.setFieldValue('yearconstruction', date ? date.toISOString() : null);
                setDate(date);
              }}
              onBlur={formik.handleBlur}
              customInput={<CustomTextField error={formik.touched.yearconstruction && Boolean(formik.errors.yearconstruction)} fullWidth label='Año de construcción' />}
            />
            {formik.touched.yearconstruction && formik.errors.yearconstruction && (
              <FormHelperText className='text-red-500'>{formik.errors.yearconstruction}</FormHelperText>
            )}
          </Grid>

          {
            globalType == "vivienda" ?
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Estrato'
                  InputProps={{ inputProps: { min: 0 } }}
                  id="stratum"
                  value={stratum}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.stratum && formik.errors.stratum ? formik.errors.stratum : ''}
                  error={formik.touched.stratum && Boolean(formik.errors.stratum)}
                />
              </Grid>
              : null
          }

          <Grid item xs={12} md={12}>
            <hr className="w-full h-px bg-gray-100" />
          </Grid>


          {
            globalType == "vivienda" ?
              <Grid item xs={12} md={3}>
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Número de habitaciones'
                  InputProps={{ inputProps: { min: 0 } }}
                  id="roomsnum"
                  value={roomsnum}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.roomsnum && formik.errors.roomsnum ? formik.errors.roomsnum : ''}
                  error={formik.touched.roomsnum && Boolean(formik.errors.roomsnum)}
                />
              </Grid>
              : null
          }
          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              type='number'
              label='Número de baños'
              InputProps={{ inputProps: { min: 0 } }}
              id="bathroomnum"
              value={bathroomnum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.bathroomnum && formik.errors.bathroomnum ? formik.errors.bathroomnum : ''}
              error={formik.touched.bathroomnum && Boolean(formik.errors.bathroomnum)}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              type='number'
              label='Número de parqueaderos'
              InputProps={{ inputProps: { min: 0 } }}
              id="garagenum"
              value={garagenum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.garagenum && formik.errors.garagenum ? formik.errors.garagenum : ''}
              error={formik.touched.garagenum && Boolean(formik.errors.garagenum)}
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
                color='primary'
                type='submit'
                endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
                }
              >
                Siguiente
              </Button>
            </div>
          </Grid>


        </Grid>
      </form>
    </>
  )
}

export default StepCollectionData
