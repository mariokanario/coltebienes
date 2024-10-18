// React Imports
import { useEffect, useState } from 'react'

// Third-party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'

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
import { useProvider } from '@/components/context/Provider'
import CustomTextField from '@core/components/mui/TextField'
import DirectionalIcon from '@components/DirectionalIcon'
import CustomAutocomplete from '@core/components/mui/Autocomplete'

// JSON Imports
import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'
import { useForm } from '../../../components/context/FormContext'
import { formDataInterface } from '@/components/context/FormDataInterface'
import { FormHelperText } from '@mui/material'

const comercioDataString = comercioData as Record<string, any>

type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}


const Schema = yup
  .object({
    industrial_park: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    parking_bay: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    communal_bathrooms: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    public_toilets: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    level_dock: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    idepressed_dock: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    floor_load_capacity: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    bridgecrane: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    useful_room: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    digital_access_in_building: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    number_of_levels: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Es requerido").min(1, "Ingrese un valor diferente a 0"),
    floor_number: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Es requerido").min(1, "Ingrese un valor diferente a 0"),
    otherspecifications: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    surveillanceExternal: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    facade: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    commonzones: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    unit_type: yup.string().required('Seleccione una opción de parqueadero'),
    parking_lot: yup.string().required('Seleccione una opción de parqueadero'),
    quantity_load_capacity: yup.number()
      .nullable()
      .when('floor_load_capacity', (floor_load_capacity: any, schema) => {
        if (floor_load_capacity[0] === 'si') {
          return schema
            .required('Ingrese un valor')
            .min(1, 'Ingrese un valor diferente a 0')
        } else {
          return schema.notRequired().nullable()
        }
      }),
  })
  .required()

const SchemaVivienda = yup
  .object({
    useful_room: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    number_of_levels: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Es requerido").min(1, "Ingrese un valor diferente a 0"),
    floor_number: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Es requerido").min(1, "Ingrese un valor diferente a 0"),
    otherspecifications: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    exposedbrick: yup.string().required('Este campo es obligatorio'),
    parking_lot: yup.string().required('Seleccione una opción de parqueadero'),
    surveillanceExternal: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    commonzones: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    floor_load_capacity: yup.string().oneOf(['si', 'no'], 'Debes seleccionar una opción válida').required('Este campo es obligatorio'),
    quantity_load_capacity: yup.number()
      .nullable()
      .when('floor_load_capacity', (floor_load_capacity: any, schema) => {
        if (floor_load_capacity[0] === 'si') {
          return schema
            .required('Ingrese un valor')
            .min(1, 'Ingrese un valor diferente a 0')
        } else {
          return schema.notRequired().nullable()
        }
      }),
  })
  .required()

const StepExternalFeatures = ({ activeStep, handlePrev, handleNext, steps }: Props) => {

  const { globalType } = useProvider()
  const [front, setFront] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<string[]>([])
  const [specificationsAmount, setSpecificationsAmount] = useState<{ [key: string]: number }>({})
  const [watch, setWatch] = useState<string[]>([])
  const [commonZonesOption, setCommonZonesOption] = useState<string[]>([])
  const { formData, setFormData, resetFormExternal, setResetFormExternal } = useForm()


  const initialValues = globalType === "vivienda"
    ? {
      useful_room: '',
      exposedbrick: '',
      number_of_levels: 0,
      floor_number: 0,
      otherspecifications: specifications,
      specificationsAmount,
      quantity_load_capacity: 0,
      parking_lot: '',
      surveillanceExternal: watch,
      commonzones: commonZonesOption,
      floor_load_capacity: '',
    }
    : {
      industrial_park: '',
      parking_bay: '',
      communal_bathrooms: '',
      public_toilets: '',
      level_dock: '',
      idepressed_dock: '',
      floor_load_capacity: '',
      bridgecrane: '',
      useful_room: '',
      digital_access_in_building: '',
      facade: front,
      quantity_load_capacity: 0,
      number_of_levels: 0,
      floor_number: 0,
      otherspecifications: specifications,
      specificationsAmount,
      parking_lot: '',
      unit_type: '',
      surveillanceExternal: watch,
      commonzones: commonZonesOption,
    }

  const othersAmount: { [key: string]: string } = {
    "Acceso pavimentado": "quantitypaved",
    "Alarma de incendio": "quantityfire",
    "Área rural": "quantityrural",
    "Área urbana": "quantityurban",
    "Ascensor": "quantityelevator",
    "En centro comercial": "quantityshopping",
    "En edificio": "quantityinbuilding",
    "Zona comercial": "quantityshoppingarea",
    "Zona residencial": "quantityresidentialarea",
    "Escalera de emergencia": "quantityemergencystaircase",
    "Esquinero": "quantitycorner",
    "Fuera de centro comercial": "quantityoutsidemall",
    "Malacate": "quantitywinch",
    "Puerta camión": "quantitytruck",
    "Puerta peatonal": "quantitypedestrian",
    "Puerta persiana": "quantityshutter",
    "Puerta vidriera": "quantityglassdoor",
    "Shut de basura": "quantityshut",
    "Ascensor privado": "quantityprivalelevator",
    "Conjunto cerrado": "quantityclosedset",
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: globalType === "vivienda" ? SchemaVivienda : Schema,
    onSubmit: (values) => {
      const combinedSpecifications = formik.values.otherspecifications.map((spec) => {
        const amountKey = othersAmount[spec];
        return {
          specification: spec,
          amount: specificationsAmount[amountKey] || 0,
        };
      });
      setFormData((prevData: formDataInterface) => ({
        ...prevData,
        ...values,
        combinedSpecifications,
      }));
      handleNext();
    },
  })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSpecificationsAmount(prev => ({
      ...prev,
      [id]: Number(value)
    }));
    formik.setFieldValue(id, Number(value));
  }

  const handlePrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formik.values,
    }))
    handlePrev()
  }

  useEffect(() => {
    if (resetFormExternal === true) {
      formik.resetForm()
      setResetFormExternal(false)
    }
  }, [resetFormExternal])

  useEffect(() => {
    if (globalType === "vivienda") {
      if (
        formik.values.useful_room !== formData.useful_room ||
        formik.values.exposedbrick !== formData.exposedbrick ||
        formik.values.number_of_levels !== formData.number_of_levels ||
        formik.values.floor_number !== formData.floor_number ||
        formik.values.otherspecifications !== formData.otherspecifications ||
        formik.values.specificationsAmount !== formData.specificationsAmount ||
        formik.values.parking_lot !== formData.parking_lot ||
        formik.values.surveillanceExternal !== formData.surveillanceExternal ||
        formik.values.commonzones !== formData.commonzones ||
        formik.values.floor_load_capacity !== formData.floor_load_capacity ||
        formik.values.quantity_load_capacity !== formData.quantity_load_capacity
      ) {
        formik.setValues({
          useful_room: formData.useful_room || '',
          exposedbrick: formData.exposedbrick || '',
          number_of_levels: formData.number_of_levels || 0,
          floor_number: formData.floor_number || 0,
          otherspecifications: formData.otherspecifications || [],
          specificationsAmount: formData.specificationsAmount || {},
          parking_lot: formData.parking_lot || '',
          surveillanceExternal: formData.surveillanceExternal || [],
          commonzones: formData.commonzones || [],
          floor_load_capacity: formData.floor_load_capacity || '',
          quantity_load_capacity: formData.quantity_load_capacity || 0,

        })
      }
    } else {
      if (
        formik.values.industrial_park !== formData.industrial_park ||
        formik.values.parking_bay !== formData.parking_bay ||
        formik.values.communal_bathrooms !== formData.communal_bathrooms ||
        formik.values.public_toilets !== formData.public_toilets ||
        formik.values.level_dock !== formData.level_dock ||
        formik.values.idepressed_dock !== formData.idepressed_dock ||
        formik.values.floor_load_capacity !== formData.floor_load_capacity ||
        formik.values.bridgecrane !== formData.bridgecrane ||
        formik.values.useful_room !== formData.useful_room ||
        formik.values.digital_access_in_building !== formData.digital_access_in_building ||
        formik.values.facade !== formData.facade ||
        formik.values.quantity_load_capacity !== formData.quantity_load_capacity ||
        formik.values.number_of_levels !== formData.number_of_levels ||
        formik.values.floor_number !== formData.floor_number ||
        formik.values.otherspecifications !== formData.otherspecifications ||
        formik.values.specificationsAmount !== formData.specificationsAmount ||
        formik.values.parking_lot !== formData.parking_lot ||
        formik.values.unit_type !== formData.unit_type ||
        formik.values.surveillanceExternal !== formData.surveillanceExternal ||
        formik.values.commonzones !== formData.commonzones
      ) {
        formik.setValues({
          industrial_park: formData.industrial_park || '',
          parking_bay: formData.parking_bay || '',
          communal_bathrooms: formData.communal_bathrooms || '',
          public_toilets: formData.public_toilets || '',
          level_dock: formData.level_dock || '',
          idepressed_dock: formData.idepressed_dock || '',
          floor_load_capacity: formData.floor_load_capacity || '',
          bridgecrane: formData.bridgecrane || '',
          useful_room: formData.useful_room || '',
          digital_access_in_building: formData.digital_access_in_building || '',
          facade: formData.facade || [],
          quantity_load_capacity: formData.quantity_load_capacity || 0,
          number_of_levels: formData.number_of_levels || 0,
          floor_number: formData.floor_number || 0,
          otherspecifications: formData.otherspecifications || [],
          specificationsAmount: formData.specificationsAmount || {},
          parking_lot: formData.parking_lot || '',
          unit_type: formData.unit_type || '',
          surveillanceExternal: formData.surveillanceExternal || [],
          commonzones: formData.commonzones || []
        })
      }
    }
  }, [formData, globalType])


  useEffect(() => {
    if (formData?.combinedSpecifications) {
      const initialAmounts = formData.combinedSpecifications.reduce((acc, { specification, amount }) => {
        const key = othersAmount[specification];
        if (key) {
          acc[key] = amount;
        }
        return acc;
      }, {} as { [key: string]: number });

      setSpecificationsAmount(initialAmounts);
    }
  }, [formData]);

  const {
    number_of_levels, floor_number, quantity_load_capacity, otherspecifications
  } = formik.values

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete='off'>
        <Grid container spacing={6}>

          {
            globalType == "comercio" ?
              <>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Parque industrial</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="industrial_park"
                      value={formik.values.industrial_park}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.industrial_park && formik.errors.industrial_park && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.industrial_park}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Bahia de parqueo</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="parking_bay"
                      value={formik.values.parking_bay}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.parking_bay && formik.errors.parking_bay && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.parking_bay}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Baños comunales</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="communal_bathrooms"
                      value={formik.values.communal_bathrooms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.communal_bathrooms && formik.errors.communal_bathrooms && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.communal_bathrooms}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Baños públicos</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="public_toilets"
                      value={formik.values.public_toilets}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.public_toilets && formik.errors.public_toilets && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.public_toilets}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Muelle a nivel</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="level_dock"
                      value={formik.values.level_dock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.level_dock && formik.errors.level_dock && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.level_dock}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Muelle deprimido</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="idepressed_dock"
                      value={formik.values.idepressed_dock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.idepressed_dock && formik.errors.idepressed_dock && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.idepressed_dock}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Puente grúa</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="bridgecrane"
                      value={formik.values.bridgecrane}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.bridgecrane && formik.errors.bridgecrane && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.bridgecrane}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Cuarto útil</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="useful_room"
                      value={formik.values.useful_room}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.useful_room && formik.errors.useful_room && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.useful_room}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Acceso digital en edificio</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="digital_access_in_building"
                      value={formik.values.digital_access_in_building}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.digital_access_in_building && formik.errors.digital_access_in_building && (
                      <FormHelperText style={{ color: 'red' }}>{formik.errors.digital_access_in_building}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={12}>
                  <hr className="w-full h-px bg-gray-100" />
                </Grid>


                <Grid item xs={12} md={6}>
                  <CustomAutocomplete
                    fullWidth
                    multiple
                    disableCloseOnSelect
                    value={formik.values.facade}
                    onChange={(event, value) => {
                      setFront(value as string[])
                      formik.setFieldValue('facade', value)
                    }
                    }
                    id='facade'
                    options={
                      comercioDataString[globalType].Externo["Fachada"].map((tipo: string) => (tipo))
                    }
                    getOptionLabel={option => option || ''}
                    renderInput={params => <CustomTextField {...params} placeholder='Seleccione la fachada' label='Fachada' helperText={formik.touched.facade && formik.errors.facade ? formik.errors.facade : ''}
                      error={formik.touched.facade && Boolean(formik.errors.facade)} />}
                    renderTags={(value: string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                      ))
                    }
                  />
                </Grid>



              </>

              :

              <>
                <Grid item xs={6} md={4}>
                  <FormControl error={formik.touched.useful_room && Boolean(formik.errors.useful_room)}>
                    <FormLabel>Cuarto útil</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="useful_room"
                      value={formik.values.useful_room}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.useful_room && formik.errors.useful_room && (
                      <FormHelperText>{formik.errors.useful_room}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>


                <Grid item xs={6} md={4}>
                  <FormControl error={formik.touched.exposedbrick && Boolean(formik.errors.exposedbrick)}>
                    <FormLabel>Ladrillo a la vista</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="exposedbrick"
                      value={formik.values.exposedbrick}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                    {formik.touched.exposedbrick && formik.errors.exposedbrick && (
                      <FormHelperText>{formik.errors.exposedbrick}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

              </>
          }

          <Grid item xs={12} md={6}>
            <CustomTextField
              type='number'
              fullWidth
              onFocus={(e) => e.target.select()}
              label='Cantidad de niveles'
              id="number_of_levels"
              placeholder='Ingrese la cantidad de niveles'
              value={number_of_levels || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.number_of_levels && formik.errors.number_of_levels ? formik.errors.number_of_levels : ''}
              error={formik.touched.number_of_levels && Boolean(formik.errors.number_of_levels)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              type='number'
              fullWidth
              label='En el piso número'
              placeholder='Ingrese el número de pisos'
              id="floor_number"
              value={floor_number || ''}
              onFocus={(e) => e.target.select()}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.floor_number && formik.errors.floor_number ? formik.errors.floor_number : ''}
              error={formik.touched.floor_number && Boolean(formik.errors.floor_number)}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl
              error={
                formik.touched.otherspecifications &&
                Boolean(formik.errors.otherspecifications)
              }
              fullWidth
            >
              <CustomAutocomplete
                fullWidth
                multiple
                disableCloseOnSelect
                value={formik.values.otherspecifications}
                onChange={(event, value) => {
                  formik.setFieldValue('otherspecifications', value)
                }}
                options={comercioDataString[globalType].Externo["Otras especificaciones"]}
                getOptionLabel={(option) => option || ''}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    label='Otras especificaciones'
                    placeholder='Seleccione otras especificaciones'
                    helperText={formik.touched.otherspecifications && formik.errors.otherspecifications ? formik.errors.otherspecifications : ''}
                    error={formik.touched.otherspecifications && Boolean(formik.errors.otherspecifications)}
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} size='small' {...getTagProps({ index })} key={index} />
                  ))
                }
              />
            </FormControl>
          </Grid>

          {/* Campos dinámicos para las cantidades */}
          {formik.values.otherspecifications.map((item, index) => (
            <Grid key={index} item xs={6} md={3}>
              <CustomTextField
                type='number'
                fullWidth
                label={`Cantidad ${item}`}
                placeholder='Ingrese la cantidad'
                id={othersAmount[item]}
                value={specificationsAmount[othersAmount[item]] || ''}
                onChange={handleAmountChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          ))}

          <Grid item xs={12} md={12}>
            <hr className="w-full h-px bg-gray-100" />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={formik.touched.parking_lot && Boolean(formik.errors.parking_lot)}>
              <CustomTextField
                select
                fullWidth
                label='Parqueadero'
                aria-describedby='parqueadero'
                defaultValue=''
                id="parking_lot"
                name="parking_lot"
                value={formik.values.parking_lot}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.parking_lot && formik.errors.parking_lot ? formik.errors.parking_lot : ''}
                error={formik.touched.parking_lot && Boolean(formik.errors.parking_lot)}
              >
                <MenuItem value='' disabled>Seleccione parqueadero</MenuItem>
                {
                  comercioDataString[globalType].Externo['Parqueadero'].map((tipo: string, index: number) => (
                    <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
                  ))
                }
              </CustomTextField>
            </FormControl>
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
                  id="unit_type"
                  name="unit_type"
                  value={formik.values.unit_type}
                  onChange={formik.handleChange}
                  helperText={formik.touched.unit_type && formik.errors.unit_type ? formik.errors.unit_type : ''}
                  error={formik.touched.unit_type && Boolean(formik.errors.unit_type)}
                >
                  <MenuItem value='' disabled>Seleccione unidad</MenuItem>
                  {
                    comercioDataString[globalType].Externo['Unidad'].map((tipo: string, index: number) => (
                      <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
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
              disableCloseOnSelect
              id='surveillanceExternal'
              value={formik.values.surveillanceExternal}
              onChange={(event, value) => {
                setWatch(value as string[])
                formik.setFieldValue('surveillanceExternal', value)
              }}
              onBlur={formik.handleBlur}
              options={
                comercioDataString[globalType].Externo["Vigilancia"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} label='Seleccione el tipo de vigilancia' helperText={formik.touched.surveillanceExternal && formik.errors.surveillanceExternal ? formik.errors.surveillanceExternal : ''}
                error={formik.touched.surveillanceExternal && Boolean(formik.errors.surveillanceExternal)} />}
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
              disableCloseOnSelect
              id='commonzones'
              value={formik.values.commonzones}
              onChange={(event, value) => {
                setCommonZonesOption(value as string[])
                formik.setFieldValue('commonzones', value)

              }}
              onBlur={formik.handleBlur}
              options={
                comercioDataString[globalType].Externo["Zonas comunes"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} placeholder='Seleccione las zonas comunes' label='Zonas comunes' helperText={formik.touched.commonzones && formik.errors.commonzones ? formik.errors.commonzones : ''}
                error={formik.touched.commonzones && Boolean(formik.errors.commonzones)} />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />
          </Grid>

          <Grid item xs={3} md={3}>
            <FormControl error={formik.touched.floor_load_capacity && Boolean(formik.errors.floor_load_capacity)}>
              <FormLabel>Capacidad de carga de t/m² del piso</FormLabel>
              <RadioGroup
                row
                className='gap-3'
                name="floor_load_capacity"
                value={formik.values.floor_load_capacity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <FormControlLabel value='si' control={<Radio />} label='Si' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
              {formik.touched.floor_load_capacity && formik.errors.floor_load_capacity && (
                <FormHelperText style={{ color: 'red' }}>{formik.errors.floor_load_capacity}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={3} md={3}>
            <CustomTextField
              type='number'
              fullWidth
              placeholder='Ingrese la cantidad'
              label='Cantidad'
              onFocus={(e) => e.target.select()}
              disabled={formik.values.floor_load_capacity == "si" ? false : true}
              id="quantity_load_capacity"
              value={quantity_load_capacity || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity_load_capacity && Boolean(formik.errors.quantity_load_capacity)}
              helperText={formik.touched.quantity_load_capacity && formik.errors.quantity_load_capacity}
            />
          </Grid>



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

export default StepExternalFeatures
