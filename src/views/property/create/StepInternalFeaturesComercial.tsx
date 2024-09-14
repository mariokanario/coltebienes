// React Imports
import { useEffect, useState } from 'react';

// Third-party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';

// MUI Imports
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

// Component Imports
import { useProvider } from '@/components/context/Provider';
import CustomAutocomplete from '@core/components/mui/Autocomplete';
import CustomTextField from '@core/components/mui/TextField';
import DirectionalIcon from '@components/DirectionalIcon';

// JSON Imports
import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json';
import { formDataInterface } from '@/components/context/FormDataInterface';
import { useForm } from '../../../components/context/FormContext';
import save from '@/app/api/captaciones/save';

const comercioDataString = comercioData as Record<string, any>;


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}


const SchemaHouse = yup
  .object({
    number_of_rooms: yup.number().required("Agregue un valor"),
    number_of_bathrooms: yup.number().required("Agregue un valor"),
    number_of_parking_spaces: yup.number().required("Agregue un valor"),


  })
  .required();

const SchemaBuild = yup
  .object({
    electric_connection: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    type_kitchen: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    coveredfinishes: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    height: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0"),
    depth: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0"),
    front: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0"),
    number_of_parking_spaces: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0"),
    number_of_bathrooms: yup
      .number()
      .typeError('Agregue un valor válido')
      .required("Agregue un área")
      .min(1, "Ingrese un valor diferente a 0"),
    propertystatus: yup.string()
      .notOneOf([''], 'Debe seleccionar el estado del inmueble')
      .required('El campo es obligatorio'),
    others: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    type_floor: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    surveillance: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),
    winery: yup.string()
      .notOneOf([''], 'Debe seleccionar un tipo de bodega')
      .required('El campo es obligatorio'),
    has_a_balcony: yup
      .string()
      .required("Seleccione una opción"),
    has_a_terrace: yup
      .string()
      .required("Seleccione una opción"),
    has_air_conditioner: yup
      .string()
      .required("Seleccione una opción"),
    has_central_air: yup
      .string()
      .required("Seleccione una opción"),
  })
  .required();

const StepInternalFeaturesComercial = ({ activeStep, handlePrev, handleNext, steps }: Props) => {

  const { globalType } = useProvider();
  const [type_kitchenDetails, settype_kitchenDetails] = useState<string[]>([])
  const [otherSpecifications, setOtherSpecifications] = useState<string[]>([])
  const [electric_connectionOptions, setelectric_connectionOptions] = useState<string[]>([])
  const [type_floorOptions, settype_floorOptions] = useState<string[]>([])
  const [coveredFini, setCoveredFini] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])
  const { formData, setFormData } = useForm();

  const validationSchemaVar = globalType === "vivienda" ? SchemaHouse : SchemaBuild;

  const initialValues = globalType === "vivienda"
    ? {
      coveredfinishes: coveredFini,
      height: 0,
      bathtub: "",
      jacuzzi: "",
      chimney: "",
      closet: "",
      linencloset: "",
      dressingroom: "",
      type_kitchen: type_kitchenDetails,
      propertystatus: "",
      dining: "",
      diningroom: "",
      penthouse: "",
      yard: "",
      clotheszone: "",
      type_floor: type_floorOptions,
      hall: "",
      lounge: "",
      has_a_balcony: "",
      has_a_terrace: "",
      deck: "",
      duplex: "",
      loft: "",
      securitydoor: "",
      number_of_rooms: 0,
      number_of_bathrooms: 0,
      number_of_parking_spaces: 0,

    }
    :
    {
      coveredfinishes: coveredFini,
      height: 0,
      depth: 0,
      front: 0,
      type_kitchen: type_kitchenDetails,
      propertystatus: "",
      electric_connection: electric_connectionOptions,
      others: otherSpecifications,
      winery: "",
      type_floor: type_floorOptions,
      has_a_balcony: "",
      has_a_terrace: "",
      has_air_conditioner: "",
      has_central_air: "",
      surveillance: watch,
      number_of_bathrooms: 0,
      number_of_parking_spaces: 0,

    }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaVar,
    onSubmit: (values) => {
      console.log("Coleccion comercial")
      console.log(values)
      setFormData((prevData: formDataInterface) => ({
        ...prevData,
        ...values,
      }));
      handleNext()
    },
  });


  const handlePrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formik.values,
    }));
    handlePrev();
  };

  async function saveCollectionData() {
    const response = await save(formData)
  }

  useEffect(() => {
    console.log(formData)
    //saveCollectionData()
  }, [])


  useEffect(() => {
    if (globalType === "vivienda") {
      if (
        formik.values.coveredfinishes !== formData.coveredfinishes ||
        formik.values.height !== formData.height ||
        formik.values.bathtub !== formData.bathtub ||
        formik.values.jacuzzi !== formData.jacuzzi ||
        formik.values.chimney !== formData.chimney ||
        formik.values.closet !== formData.closet ||
        formik.values.linencloset !== formData.linencloset ||
        formik.values.dressingroom !== formData.dressingroom ||
        formik.values.type_kitchen !== formData.type_kitchen ||
        formik.values.propertystatus !== formData.propertystatus ||
        formik.values.dining !== formData.dining ||
        formik.values.diningroom !== formData.diningroom ||
        formik.values.penthouse !== formData.penthouse ||
        formik.values.yard !== formData.yard ||
        formik.values.clotheszone !== formData.clotheszone ||
        formik.values.type_floor !== formData.type_floor ||
        formik.values.hall !== formData.hall ||
        formik.values.lounge !== formData.lounge ||
        formik.values.has_a_balcony !== formData.has_a_balcony ||
        formik.values.has_a_terrace !== formData.has_a_terrace ||
        formik.values.deck !== formData.deck ||
        formik.values.duplex !== formData.duplex ||
        formik.values.loft !== formData.loft ||
        formik.values.securitydoor !== formData.securitydoor ||
        formik.values.number_of_rooms !== formData.number_of_rooms ||
        formik.values.number_of_bathrooms !== formData.number_of_bathrooms ||
        formik.values.number_of_parking_spaces !== formData.number_of_parking_spaces
      ) {
        formik.setValues({
          coveredfinishes: formData.coveredfinishes || [],
          height: formData.height || 0,
          bathtub: formData.bathtub || '',
          jacuzzi: formData.jacuzzi || '',
          chimney: formData.chimney || '',
          closet: formData.closet || '',
          linencloset: formData.linencloset || '',
          dressingroom: formData.dressingroom || '',
          type_kitchen: formData.type_kitchen || [],
          propertystatus: formData.propertystatus || "",
          dining: formData.dining || '',
          diningroom: formData.diningroom || '',
          penthouse: formData.penthouse || '',
          yard: formData.yard || '',
          clotheszone: formData.clotheszone || '',
          type_floor: formData.type_floor || [],
          hall: formData.hall || '',
          lounge: formData.lounge || '',
          has_a_balcony: formData.has_a_balcony || '',
          has_a_terrace: formData.has_a_terrace || '',
          deck: formData.deck || '',
          duplex: formData.duplex || '',
          loft: formData.loft || '',
          securitydoor: formData.securitydoor || '',
          number_of_rooms: formData.number_of_rooms || 0,
          number_of_bathrooms: formData.number_of_bathrooms || 0,
          number_of_parking_spaces: formData.number_of_parking_spaces || 0
        });
      }
    } else {
      if (
        formik.values.coveredfinishes !== formData.coveredfinishes ||
        formik.values.height !== formData.height ||
        formik.values.depth !== formData.depth ||
        formik.values.front !== formData.front ||
        formik.values.type_kitchen !== formData.type_kitchen ||
        formik.values.propertystatus !== formData.propertystatus ||
        formik.values.electric_connection !== formData.electric_connection ||
        formik.values.others !== formData.others ||
        formik.values.winery !== formData.winery ||
        formik.values.type_floor !== formData.type_floor ||
        formik.values.has_a_balcony !== formData.has_a_balcony ||
        formik.values.has_a_terrace !== formData.has_a_terrace ||
        formik.values.has_air_conditioner !== formData.has_air_conditioner ||
        formik.values.has_central_air !== formData.has_central_air ||
        formik.values.surveillance !== formData.surveillance ||
        formik.values.number_of_bathrooms !== formData.number_of_bathrooms ||
        formik.values.number_of_parking_spaces !== formData.number_of_parking_spaces
      ) {
        formik.setValues({
          coveredfinishes: formData.coveredfinishes || [],
          height: formData.height || 0,
          depth: formData.depth || 0,
          front: formData.front || 0,
          type_kitchen: formData.type_kitchen || [],
          propertystatus: formData.propertystatus || "",
          electric_connection: formData.electric_connection || [],
          others: formData.others || [],
          winery: formData.winery || '',
          type_floor: formData.type_floor || [],
          has_a_balcony: formData.has_a_balcony || '',
          has_a_terrace: formData.has_a_terrace || '',
          has_air_conditioner: formData.has_air_conditioner || '',
          has_central_air: formData.has_central_air || '',
          surveillance: formData.surveillance || [],
          number_of_bathrooms: formData.number_of_bathrooms || 0,
          number_of_parking_spaces: formData.number_of_parking_spaces || 0
        });
      }
    }
  }, [formData, globalType]);


  const {
    depth, front, number_of_rooms, number_of_bathrooms, number_of_parking_spaces
  } = formik.values;


  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6} >
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='coveredfinishes'
            value={formik.values.coveredfinishes}
            onChange={(event, value) => {
              setCoveredFini(value as string[])
              formik.setFieldValue('coveredfinishes', value);

            }}
            onBlur={formik.handleBlur}
            options={
              comercioDataString[globalType].Interno["Acabados cubierta"].map((tipo: string) => (tipo))
            }
            getOptionLabel={option => option || ''}
            renderInput={params =>
              <CustomTextField {...params} label='Acabados cubierta' placeholder='Seleccione los acabados'
                error={Boolean(formik.touched.coveredfinishes && formik.errors.coveredfinishes)}
                helperText={formik.touched.coveredfinishes && formik.errors.coveredfinishes ? formik.errors.coveredfinishes : ""}
              />
            }
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }

          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            type='number'
            label='Altura en metros'
            onFocus={(e) => e.target.select()}
            placeholder='Ingrese la altura en metros'
            id="height"
            value={formik.touched.height || ''}
            error={formik.touched.height && Boolean(formik.errors.height)}
            helperText={formik.touched.height && formik.errors.height}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='text-textDisabled'>
                  m
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
            label='Fondo en metros'
            placeholder='Ingrese el fondo en metros'
            id="depth"
            value={depth || ''}
            error={formik.touched.depth && Boolean(formik.errors.depth)}
            helperText={formik.touched.depth && formik.errors.depth}
            onFocus={(e) => e.target.select()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='text-textDisabled'>
                  m
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
            label='Frente'
            placeholder='Ingrese el frente en metros'
            id="front"
            value={front || ''}
            error={formik.touched.front && Boolean(formik.errors.front)}
            helperText={formik.touched.front && formik.errors.front}
            onFocus={(e) => e.target.select()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end' className='text-textDisabled'>
                  mt
                </InputAdornment>
              ),
              inputProps: { min: 0 }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>

          <FormControl
            error={
              globalType === "vivienda" ?
                formik.touched.type_kitchen &&
                Boolean(formik.errors.type_kitchen)
                :
                false
            }
            fullWidth
          >
            <CustomAutocomplete
              fullWidth
              multiple
              disableCloseOnSelect
              value={formik.values.type_kitchen}
              onChange={(event, value) => {
                settype_kitchenDetails(value as string[])
                formik.setFieldValue('type_kitchen', value);
              }}
              id='type_kitchen'
              options={
                comercioDataString[globalType].Interno.Cocina.map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params =>
                <CustomTextField {...params} placeholder='Seleccione el tipo de cocina'
                  label={`Cocina ${globalType === "vivienda" ? " *" : ""}`} error={Boolean(formik.touched.type_kitchen && formik.errors.type_kitchen)}
                  helperText={formik.touched.type_kitchen && formik.errors.type_kitchen ? formik.errors.type_kitchen : ""}
                />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            select
            fullWidth
            label="Estado del inmueble"
            id="propertystatus"
            name="propertystatus"
            value={formik.values.propertystatus}
            onChange={formik.handleChange}
            error={formik.touched.propertystatus && Boolean(formik.errors.propertystatus)}
            helperText={formik.touched.propertystatus && formik.errors.propertystatus ? formik.errors.propertystatus : ""}
          >
            <MenuItem value="" disabled>
              Seleccione estado del inmueble
            </MenuItem>
            {comercioDataString[globalType].Interno["Estado del inmueble"].map((estado: string) => (
              <MenuItem key={estado} value={estado}>
                {estado}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id="electric_connection"
            value={formik.values.electric_connection}
            onChange={(event, value) => {
              setelectric_connectionOptions(value as string[]);
              formik.setFieldValue("electric_connection", value);
            }}
            onBlur={formik.handleBlur}
            options={comercioDataString[globalType].Interno["Energía"].map((tipo: string) => tipo)}
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Tipo de energia"
                placeholder='Seleccione el tipo de energia'
                error={Boolean(formik.touched.electric_connection && formik.errors.electric_connection)}
                helperText={formik.touched.electric_connection && formik.errors.electric_connection ? formik.errors.electric_connection : ""}
              />
            )}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size="small" {...getTagProps({ index })} key={index} />
              ))
            }
          />
        </Grid>
        {/*  <Grid item xs={2} md={2}>
                <CustomTextField
                  type='number'
                  fullWidth
                  label='Cantidad'
                  disabled={!amountelectric_connectionActive ? true : false}
                  onFocus={(e) => e.target.select()}
                  id="amountelectric_connection"
                  value={amountelectric_connection}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Grid> */}


        <Grid item xs={12} md={6}>

          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            value={formik.values.others}
            onChange={(event, value) => {
              setOtherSpecifications(value as string[])
              formik.setFieldValue('others', value);
            }}
            id='others'
            options={
              comercioDataString[globalType].Interno["Otras especificaciones"].map((tipo: string) => (tipo))
            }

            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Otras especificaciones' placeholder='Seleccione otras especificaciones' error={formik.touched.others && Boolean(formik.errors.others)} helperText={formik.touched.others && formik.errors.others ? formik.errors.others : ""} />}
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
            label='Tipo de bodega'
            defaultValue=''
            id="winery"
            name="winery"
            error={formik.touched.winery && Boolean(formik.errors.winery)}
            helperText={formik.touched.winery && formik.errors.winery ? formik.errors.winery : ""}
            value={formik.values.winery}
            onChange={formik.handleChange}

          >
            <MenuItem value='' disabled>Seleccione tipo de bodega</MenuItem>
            {
              comercioDataString[globalType].Interno['Tipo de bodega'].map((tipo: string) => (
                <MenuItem key={tipo} value={tipo}> {tipo} </MenuItem>
              ))
            }
          </CustomTextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='type_floor'
            value={formik.values.type_floor}
            onChange={(event, value) => {
              settype_floorOptions(value as string[])
              formik.setFieldValue('type_floor', value);

            }}
            onBlur={formik.handleBlur}
            options={
              comercioDataString[globalType].Interno["Pisos"].map((tipo: string) => (tipo))
            }
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Tipo de piso' error={Boolean(formik.touched.type_floor && formik.errors.type_floor)}
              helperText={formik.touched.type_floor && formik.errors.type_floor ? formik.errors.type_floor : ""} placeholder='Seleccione los tipo de pisos' />}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }
          />

        </Grid>



        <Grid item xs={6} md={6}>
          <FormControl error={formik.touched.has_a_balcony && Boolean(formik.errors.has_a_balcony)}>
            <FormLabel>Balcón</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="has_a_balcony"
              value={formik.values.has_a_balcony}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.has_a_balcony && formik.errors.has_a_balcony && (
              <FormHelperText>{formik.errors.has_a_balcony}</FormHelperText>
            )}
          </FormControl>
        </Grid>


        <Grid item xs={12} md={6}>
          <FormControl error={formik.touched.has_a_terrace && Boolean(formik.errors.has_a_terrace)}>
            <FormLabel>Terraza</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="has_a_terrace"
              value={formik.values.has_a_terrace}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.has_a_terrace && formik.errors.has_a_terrace && (
              <FormHelperText>{formik.errors.has_a_terrace}</FormHelperText>
            )}
          </FormControl>
        </Grid>



        <Grid item xs={12} md={6}>
          <FormControl error={formik.touched.has_air_conditioner && Boolean(formik.errors.has_air_conditioner)}>
            <FormLabel>Aire acondicionado</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="has_air_conditioner"
              value={formik.values.has_air_conditioner}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.has_air_conditioner && formik.errors.has_air_conditioner && (
              <FormHelperText>{formik.errors.has_air_conditioner}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={formik.touched.has_central_air && Boolean(formik.errors.has_central_air)}>
            <FormLabel>Aire central</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="has_central_air"
              value={formik.values.has_central_air}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.has_central_air && formik.errors.has_central_air && (
              <FormHelperText>{formik.errors.has_central_air}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='surveillance'
            value={formik.values.surveillance}
            onChange={(event, value) => {
              setWatch(value as string[])
              formik.setFieldValue('surveillance', value);
            }}
            options={
              comercioDataString[globalType].Externo["Vigilancia"].map((tipo: string) => (tipo))
            }
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Tipo de vigilacia' error={Boolean(formik.touched.surveillance && formik.errors.surveillance)}
              helperText={formik.touched.surveillance && formik.errors.surveillance ? formik.errors.surveillance : ""} placeholder='Seleccione el tipo de vigilancia' />
            }
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }
          />
        </Grid>


        <Grid item xs={12} md={3}>
          <CustomTextField
            fullWidth
            type='number'
            label='Número de baños'
            placeholder='Ingrese el número de baños'
            InputProps={{ inputProps: { min: 0 } }}
            id="number_of_bathrooms"
            value={number_of_bathrooms || ''}
            onFocus={(e) => e.target.select()}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.number_of_bathrooms && formik.errors.number_of_bathrooms ? formik.errors.number_of_bathrooms : ''}
            error={formik.touched.number_of_bathrooms && Boolean(formik.errors.number_of_bathrooms)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <CustomTextField
            fullWidth
            type='number'
            label='Parqueaderos'
            placeholder='Ingrese el número de parqueaderos'
            InputProps={{ inputProps: { min: 0 } }}
            id="number_of_parking_spaces"
            value={number_of_parking_spaces || ''}
            onChange={formik.handleChange}
            onFocus={(e) => e.target.select()}
            onBlur={formik.handleBlur}
            helperText={formik.touched.number_of_parking_spaces && formik.errors.number_of_parking_spaces ? formik.errors.number_of_parking_spaces : ''}
            error={formik.touched.number_of_parking_spaces && Boolean(formik.errors.number_of_parking_spaces)}
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
    </form >
  )
}

export default StepInternalFeaturesComercial
