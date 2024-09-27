// React Imports
import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'

// Third-party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'

// MUI Imports
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

// Component Imports
import { useProvider } from '@/components/context/Provider'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { useForm } from '../../../components/context/FormContext'
import { formDataInterface } from '@/components/context/FormDataInterface'

// JSON Imports
import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'
import colombiaData from '@/app/api/fake-db/apps/form-list/colombiaData.json'
import ModalAddress from './ModalAddress'
import save from '@/app/api/captaciones/save'
import { useRouter } from 'next/navigation'
import { useAlert } from '@/components/AlertContext'
import Cookies from 'js-cookie'
const comercioDataString = comercioData as Record<string, any>


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

interface Department {
  nombre: string
  ciudades: string[]
}

const SchemaHouse = yup
  .object({
    department: yup.string().required("Elige una opción"),
    city: yup.string().required("Elige una opción"),
    neighborhood: yup.string().required("Escriba el barrio").min(5, "Debe de tener mínimo 5 letras"),
    coownershipname: yup.string().required("Escriba el nombre").min(5, "Debe de tener mínimo 5 letras"),
    property_type: yup.string().required("Elige una opción"),
    destination_property: yup.string().required("Elige una opción"),
    charge: yup.string().required("Elige una opción"),
    //canyon: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    //sale_value: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    administration_value: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    year_of_construction: yup.date().required("Agregue una fecha").nullable().transform((value, originalValue) => (originalValue === '' ? null : value)).max(new Date(), 'La fecha no puede ser mayor que la fecha actual'),
    stratum: yup.number().typeError('Agregue un valor válido').required("Agregue un valor").min(1, "El estrato debe ser al menos 1").transform((value, originalValue) => (originalValue === '' ? null : value)),
    built_area: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0")
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    private_area: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0")
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    address: yup.string().required("Escriba la dirección").min(3, "Debe de tener mínimo 3 letras"),
    include_administration: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Elige una opcion'),
  })
  .required()

const SchemaBuild = yup
  .object({
    department: yup.string().required("Elige una opción"),
    city: yup.string().required("Elige una opción"),
    neighborhood: yup.string().required("Escriba el barrio").min(5, "Debe de tener mínimo 5 letras"),
    coownershipname: yup.string().required("Escriba el nombre").min(5, "Debe de tener mínimo 5 letras"),
    property_type: yup.string().required("Elige una opción"),
    charge: yup.string().required("Elige una opción"),
    //canyon: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    //sale_value: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    administration_value: yup.number().required("Agregue un valor").min(4, "Debe de tener mínimo 4 números"),
    built_area: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0")
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    private_area: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0")
      .transform((value, originalValue) => (originalValue === '' ? null : value)),
    year_of_construction: yup.date().required("Agregue una fecha").nullable().transform((value, originalValue) => (originalValue === '' ? null : value)).max(new Date(), 'La fecha no puede ser mayor que la fecha actual'),
    include_administration: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Elige una opcion'),
    address: yup.string().required("Escriba la dirección").min(3, "Debe de tener mínimo 3 letras")
  })
  .required()

const StepCollectionData = ({ activeStep, handlePrev, handleNext, steps }: Props) => {
  const { globalType, setClearUser, globalUser, setGlobalUser } = useProvider()
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [cities, setCities] = useState<string[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [typeManagement, setTypeManagement] = useState('')
  const validationSchemaVar = globalType === "vivienda" ? SchemaHouse : SchemaBuild
  const { formData, setFormData, resetFormData, setResetFormData } = useForm()
  const [openAddress, setOpenAddress] = useState(true)
  const [sendArrayAddress, SetSendArrayAddress] = useState<string[]>([])
  const router = useRouter()
  const { showMessage } = useAlert()



  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function hadleSetAddress(address: any, arrayAddress: string[]): void {
    SetSendArrayAddress(arrayAddress)
    formik.setFieldValue('address', address)
    handleClose()
  }

  const initialValues = globalType === "vivienda" ?
    {
      department: '',
      city: '',
      neighborhood: '',
      coownershipname: '',
      property_type: '',
      destination_property: '',
      charge: '',
      canyon: 0,
      sale_value: 0,
      administration_value: 0,
      include_administration: '',
      built_area: 0,
      private_area: 0,
      year_of_construction: '',
      stratum: 0,
      address: '',
    }
    :
    {
      department: '',
      city: '',
      neighborhood: '',
      coownershipname: '',
      property_type: '',
      charge: '',
      canyon: 0,
      sale_value: 0,
      administration_value: 0,
      include_administration: '',
      built_area: 0,
      private_area: 0,
      year_of_construction: '',
      address: '',
    }

  const handlePrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formik.values,
    }))
    handlePrev()
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaVar,
    onSubmit: (values) => {
      console.log("Coleccion Data")
      console.log(values)
      console.log(sendArrayAddress)
      setFormData((prevData) => ({
        ...prevData,
        ...values,
        valuesArrayAddress: sendArrayAddress,
        status_complete: false
      }))
      saveCollectionData()
      handleNext()
    },
  })

  async function saveCollectionData() {
    try {
      const { status } = await save(formData)
      if (status !== 200) {
        showMessage("Error al guardar los datos, por favor intenta de nuevo.", "error")
        return;
      }
      showMessage("Datos guardados exitosamente", "success")
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 500) {
        showMessage("Error, vuelve a iniciar sesión", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      } else {
        console.error("Error al guardar los datos:", error)
        showMessage("Ocurrió un error inesperado, por favor intenta de nuevo.", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      }
    }
  }

  useEffect(() => {
    if (formik.values.charge) {
      console.log(formik.values.charge)
      setTypeManagement(formik.values.charge)
    }
  }, [formik.values.charge])


  useEffect(() => {
    if (resetFormData === true) {
      formik.resetForm()
      setResetFormData(false)
    }
  }, [resetFormData])

  useEffect(() => {
    if (
      formik.values.department !== formData.department ||
      formik.values.city !== formData.city ||
      formik.values.neighborhood !== formData.neighborhood ||
      formik.values.coownershipname !== formData.coownershipname ||
      formik.values.property_type !== formData.property_type ||
      formik.values.destination_property !== formData.destination_property ||
      formik.values.charge !== formData.charge ||
      formik.values.canyon !== formData.canyon ||
      formik.values.sale_value !== formData.sale_value ||
      formik.values.administration_value !== formData.administration_value ||
      formik.values.include_administration !== formData.include_administration ||
      formik.values.built_area !== formData.built_area ||
      formik.values.private_area !== formData.private_area ||
      formik.values.year_of_construction !== formData.year_of_construction ||
      formik.values.stratum !== formData.stratum ||
      formik.values.address !== formData.address
    ) {
      formik.setValues({
        department: formData.department || '',
        city: formData.city || '',
        neighborhood: formData.neighborhood || '',
        coownershipname: formData.coownershipname || '',
        property_type: formData.property_type || '',
        destination_property: formData.destination_property || '',
        charge: formData.charge || '',
        canyon: formData.canyon || 0,
        sale_value: formData.sale_value || 0,
        administration_value: formData.administration_value || 0,
        include_administration: formData.include_administration || '',
        built_area: formData.built_area || 0,
        private_area: formData.private_area || 0,
        year_of_construction: formData.year_of_construction || '',
        stratum: formData.stratum || 0,
        address: formData.address || ''
      })
    }
  }, [formData])

  const { neighborhood, address, coownershipname, stratum } = formik.values

  useEffect(() => {
    if (formik.values.department) {
      setSelectedDepartment(formik.values.department)
    }
  }, [formik.values.department])

  useEffect(() => {
    const department: Department | undefined = colombiaData.departamentos.find(
      (dept: Department) => dept.nombre === selectedDepartment
    )
    if (department) {
      setCities(department.ciudades)
    } else {
      setCities([])
    }
  }, [selectedDepartment])

  useEffect(() => {
    if (formik.values.department && formik.values.city) {
      setOpenAddress(true)
      setFormData((prevData: formDataInterface) => ({
        ...prevData,
        ...formik.values,
      }))
    } else {
      setOpenAddress(false)
    }

  }, [formik.values])

  useEffect(() => {
    console.log(formData)
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <hr className="w-full h-px bg-gray-100" />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label='Nombre de la copropiedad'
              placeholder='Ingrese nombre de la copropiedad'
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
              id='property_type'
              defaultValue=''
              name="property_type"
              value={formik.values.property_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.property_type && formik.errors.property_type ? formik.errors.property_type : ''}
              error={formik.touched.property_type && Boolean(formik.errors.property_type)}
            >
              <MenuItem value="" disabled>
                Seleccione el tipo de inmueble
              </MenuItem>
              {comercioDataString[globalType].Datos['Tipo de inmueble'].map((tipo: string, index: number) => (
                <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
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
                  id='destination_property'
                  defaultValue=''
                  name="destination_property"
                  value={formik.values.destination_property}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.destination_property && formik.errors.destination_property ? formik.errors.destination_property : ''}
                  error={formik.touched.destination_property && Boolean(formik.errors.destination_property)}
                >
                  <MenuItem value="" disabled>
                    Seleccione la destinación
                  </MenuItem>
                  {comercioDataString[globalType].Datos['Destinacion'].map((tipo: string, index: number) => (
                    <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              : null
          }
          <Grid item xs={12} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Tipo de gestión'
              id='charge'
              defaultValue=''
              name="charge"
              value={formik.values.charge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.charge && formik.errors.charge ? formik.errors.charge : ''}
              error={formik.touched.charge && Boolean(formik.errors.charge)}
            >
              <MenuItem value="" disabled>
                Seleccione el tipo de gestión
              </MenuItem>
              {comercioDataString[globalType].Datos['Tipo de gestion'].map((tipo: string, index: number) => (
                <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
              ))}
            </CustomTextField>
          </Grid>


          {(typeManagement === 'Arriendo' || typeManagement === 'Arriendo/Venta') && (
            <Grid item xs={12} md={6}>
              <CustomTextField
                fullWidth
                type='number'
                placeholder='Ingrese el valor del canon'
                label='Canon'
                id="canyon"
                value={formik.values.canyon || ''}
                onChange={formik.handleChange}
                onFocus={(e) => e.target.select()}
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
          )}


          {(typeManagement === 'Venta' || typeManagement === 'Arriendo/Venta') && (
            <Grid item xs={12} md={6}>
              <CustomTextField
                fullWidth
                type='number'
                placeholder='Ingrese el valor de venta'
                label='Valor venta'
                id="sale_value"
                value={formik.values.sale_value || ''}
                onFocus={(e) => e.target.select()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.sale_value && formik.errors.sale_value ? formik.errors.sale_value : ''}
                error={formik.touched.sale_value && Boolean(formik.errors.sale_value)}
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
          )}


          <Grid item xs={12} md={3}>
            <CustomTextField
              fullWidth
              type='number'
              placeholder='Ingrese el valor de administración'
              label='Valor administración'
              id="administration_value"
              value={formik.values.administration_value || ''}
              onChange={formik.handleChange}
              onFocus={(e) => e.target.select()}
              onBlur={formik.handleBlur}
              helperText={formik.touched.administration_value && formik.errors.administration_value ? formik.errors.administration_value : ''}
              error={formik.touched.administration_value && Boolean(formik.errors.administration_value)}
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
                name='include_administration'
                value={formik.values.include_administration}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel value='si' control={<Radio />} label='Si' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
              {formik.touched.include_administration && formik.errors.include_administration && (
                <FormHelperText style={{ color: 'red' }}>{formik.errors.include_administration}</FormHelperText>
              )}
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
              placeholder='Ingrese el área del inmueble'
              id="built_area"
              onFocus={(e) => e.target.select()}
              value={formik.values.built_area || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.built_area && formik.errors.built_area ? formik.errors.built_area : ''}
              error={formik.touched.built_area && Boolean(formik.errors.built_area)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' className='text-textDisabled'>
                    m<sup>2</sup>
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
              placeholder='Ingrese el área privada'
              id="private_area"
              value={formik.values.private_area || ''}
              onChange={formik.handleChange}
              onFocus={(e) => e.target.select()}
              onBlur={formik.handleBlur}
              helperText={formik.touched.private_area && formik.errors.private_area ? formik.errors.private_area : ''}
              error={formik.touched.private_area && Boolean(formik.errors.private_area)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end' className='text-textDisabled'>
                    m<sup>2</sup>
                  </InputAdornment>
                ),
                inputProps: { min: 0 }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppReactDatepicker
              selected={date}
              placeholderText='Ingrese la fecha de construcción'
              dateFormat='yyyy-MM-dd'
              id="year_of_construction"
              value={formik.values.year_of_construction ? new Date(formik.values.year_of_construction).toISOString().split('T')[0] : ''}
              maxDate={new Date()}
              onChange={(date: Date | null) => {
                const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null;
                formik.setFieldValue('year_of_construction', formattedDate);
                setDate(date);
              }}
              onBlur={formik.handleBlur}
              customInput={<CustomTextField error={formik.touched.year_of_construction && Boolean(formik.errors.year_of_construction)} fullWidth label='Año de construcción' />}
            />
            {formik.touched.year_of_construction && formik.errors.year_of_construction && (
              <FormHelperText className='text-red-500'>{formik.errors.year_of_construction}</FormHelperText>
            )}
          </Grid>


          {
            globalType == "vivienda" ?
              <Grid item xs={12} md={6}>
                <CustomTextField
                  fullWidth
                  type='number'
                  label='Ingrese el estrato'
                  InputProps={{ inputProps: { min: 0 } }}
                  id="stratum"
                  value={stratum || ''}
                  onFocus={(e) => e.target.select()}
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
          <Grid item xs={6} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Departamento'
              defaultValue=''
              name="department"
              value={formik.values.department}
              onChange={(e) => {
                setSelectedDepartment(e.target.value)
                formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              helperText={formik.touched.department && formik.errors.department ? formik.errors.department : ''}
              error={formik.touched.department && Boolean(formik.errors.department)}
            >
              <MenuItem value="" disabled>
                Seleccione el departamento
              </MenuItem>
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
                formik.handleChange(e)
              }}
              onBlur={formik.handleBlur}
              helperText={formik.touched.city && formik.errors.city ? formik.errors.city : ''}
              error={formik.touched.city && Boolean(formik.errors.city)}
            >
              <MenuItem value="" disabled>
                Seleccione la ciudad
              </MenuItem>
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
              placeholder='Ingrese el barrio'
              id="neighborhood"
              value={neighborhood}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.neighborhood && formik.errors.neighborhood ? formik.errors.neighborhood : ''}
              error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
            />
          </Grid>

          {openAddress && (
            <>
              <Grid item xs={9} md={9} className='d-flex'>
                <CustomTextField
                  fullWidth
                  label='Dirección'
                  id="address"
                  placeholder='Ingrese la dirección del inmueble'
                  value={address}
                  disabled
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.address && formik.errors.address ? formik.errors.address : ''}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                />
              </Grid>
              <Grid item xs={3} md={3} className='flex items-end'>
                <Button variant='outlined' onClick={handleClickOpen} className='w-100'>
                  {address !== '' ? 'Modificar dirección' : 'Agregar dirección'}
                </Button>
              </Grid>
              <ModalAddress
                open={open}
                handleClose={handleClose}
                hadleSetAddress={hadleSetAddress}
              />
            </>
          )}

          <Grid item xs={12}>
            <div className='flex items-center justify-between'>
              <Button
                variant='tonal'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handlePrevStep}
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
