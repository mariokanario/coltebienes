// React Imports
import { useEffect, useState } from 'react';

// Third-party Imports
import * as Yup from 'yup';
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
import { useForm } from '../../../components/context/FormContext';
import { formDataInterface } from '@/components/context/FormDataInterface';
import CustomAutocomplete from '@core/components/mui/Autocomplete';
import CustomTextField from '@core/components/mui/TextField';
import DirectionalIcon from '@components/DirectionalIcon';

// JSON Imports
import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json';

const comercioDataString = comercioData as Record<string, any>;


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const validationSchema = Yup.object({
  coveredfinishes: Yup.array()
    .of(Yup.string())
    .min(1, 'Seleccione al menos un acabado de cubierta')
    .required('Este campo es obligatorio'),

  propertystatus: Yup.string()
    .notOneOf([''], 'Debe seleccionar el estado del inmueble')
    .required('El campo es obligatorio'),
  number_of_bathrooms: Yup
    .number()
    .typeError('Agregue un valor válido')
    .required("Agregue un área")
    .min(1, "Ingrese un valor diferente a 0"),
  number_of_rooms: Yup
    .number()
    .typeError('Agregue un valor válido')
    .required("Agregue un área")
    .min(1, "Ingrese un valor diferente a 0"),
  number_of_parking_spaces: Yup
    .number()
    .typeError('Agregue un valor válido')
    .required("Agregue un área")
    .min(1, "Ingrese un valor diferente a 0"),
  closet: Yup.string()
    .required('Seleccione una opción para el clóset'),
  closetcount: Yup.number()
    .nullable()
    .when('closet', (closet: any, schema) => {
      if (closet[0] === 'si') {
        return schema
          .required('Ingrese un valor')
          .min(1, 'Ingrese un valor diferente a 0');
      } else {
        return schema.notRequired().nullable();
      }
    }),
  dressingroomcount: Yup.number()
    .nullable()
    .when('dressingroom', (dressingroom: any, schema) => {
      if (dressingroom[0] === 'si') {
        return schema
          .required('Ingrese un valor')
          .min(1, 'Ingrese un valor diferente a 0');
      } else {
        return schema.notRequired().nullable();
      }
    }),
  linenclosetcount: Yup.number()
    .nullable()
    .when('linencloset', (linencloset: any, schema) => {
      if (linencloset[0] === 'si') {
        return schema
          .required('Ingrese un valor')
          .min(1, 'Ingrese un valor diferente a 0');
      } else {
        return schema.notRequired().nullable();
      }
    }),
  linencloset: Yup.string()
    .required('Seleccione una opción para el clóset de lino'),
  dressingroom: Yup.string()
    .required('Seleccione una opción para el vestier'),
  bathtub: Yup.string()
    .required('Seleccione una opción para la bañera'),

  jacuzzi: Yup.string()
    .required('Seleccione una opción para el jacuzzi'),

  chimney: Yup.string()
    .required('Seleccione una opción para la chimenea'),

  type_kitchen: Yup.array()
    .of(Yup.string())
    .min(1, 'Seleccione al menos un detalle de cocina')
    .required('Este campo es obligatorio'),

  type_floor: Yup.array()
    .of(Yup.string())
    .min(1, 'Seleccione al menos un tipo de piso')
    .required('Este campo es obligatorio'),
  lounge: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  dining: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  diningroom: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  deck: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  has_a_balcony: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  has_a_terrace: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  hall: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  clotheszone: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  yard: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  duplex: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  loft: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  penthouse: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
  securitydoor: Yup.string()
    .oneOf(['si', 'no'], 'Selecciona una opción válida')
    .required('Este campo es obligatorio'),
});



const StepInternalFeaturesVivienda = ({ activeStep, handlePrev, handleNext, steps }: Props) => {
  const { globalType } = useProvider();
  const { formData, setFormData, resetFormVivendia, setResetFormVivendia } = useForm();
  const [type_kitchenDetails, settype_kitchenDetails] = useState<string[]>([])
  const [otherSpecifications, setOtherSpecifications] = useState<string[]>([])
  const [electric_connectionOptions, setelectric_connectionOptions] = useState<string[]>([])
  const [type_floorOptions, settype_floorOptions] = useState<string[]>([])
  const [coveredFini, setCoveredFini] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])

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
      closetcount: '',
      linenclosetcount: 0,
      dressingroomcount: 0
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Coleccion vivienda")
      console.log(values)
      setFormData((prevData: formDataInterface) => ({
        ...prevData,
        ...values,
      }));
      handleNext()
    },

  });

  useEffect(() => {
    if (resetFormVivendia === true) {
      formik.resetForm()
      setResetFormVivendia(false)
    }
  }, [resetFormVivendia])

  const handlePrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formik.values,
    }));
    handlePrev();
  };

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
        formik.values.number_of_parking_spaces !== formData.number_of_parking_spaces ||
        formik.values.closetcount !== formData.closetcount ||
        formik.values.linenclosetcount !== formData.linenclosetcount ||
        formik.values.dressingroomcount !== formData.dressingroomcount
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
          number_of_parking_spaces: formData.number_of_parking_spaces || 0,
          closetcount: formData.closetcount || '',
          linenclosetcount: formData.linenclosetcount || 0,
          dressingroomcount: formData.dressingroomcount || 0
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

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='coveredfinishes'
            value={formik.values.coveredfinishes}
            onChange={(event, value) => {
              setCoveredFini(value as string[]);
              formik.setFieldValue('coveredfinishes', value);
            }}
            onBlur={formik.handleBlur}
            options={comercioDataString[globalType].Interno["Acabados cubierta"].map((tipo: string) => tipo)}
            getOptionLabel={option => option || ''}
            renderInput={params => (
              <CustomTextField
                {...params}
                label='Seleccione los acabados de cubierta'
                error={formik.touched.coveredfinishes && Boolean(formik.errors.coveredfinishes)}
                helperText={formik.touched.coveredfinishes && formik.errors.coveredfinishes}
              />
            )}
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
        <Grid item xs={12} md={4}>
          <CustomTextField
            fullWidth
            type='number'
            label='Ingrese el número de habitaciones'
            InputProps={{ inputProps: { min: 0 } }}
            id="number_of_rooms"
            value={formik.values.number_of_rooms || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.number_of_rooms && formik.errors.number_of_rooms ? formik.errors.number_of_rooms : ''}
            error={formik.touched.number_of_rooms && Boolean(formik.errors.number_of_rooms)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextField
            fullWidth
            type='number'
            label='Ingrese el número de baños'
            InputProps={{ inputProps: { min: 0 } }}
            id="number_of_bathrooms"
            value={formik.values.number_of_bathrooms || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.number_of_bathrooms && formik.errors.number_of_bathrooms ? formik.errors.number_of_bathrooms : ''}
            error={formik.touched.number_of_bathrooms && Boolean(formik.errors.number_of_bathrooms)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CustomTextField
            fullWidth
            type='number'
            label='Ingrese el número de parqueaderos'
            InputProps={{ inputProps: { min: 0 } }}
            id="number_of_parking_spaces"
            name="number_of_parking_spaces"
            value={formik.values.number_of_parking_spaces || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.number_of_parking_spaces && formik.errors.number_of_parking_spaces ? formik.errors.number_of_parking_spaces : ''}
            error={formik.touched.number_of_parking_spaces && Boolean(formik.errors.number_of_parking_spaces)}
          />
        </Grid>


        {/* Clóset */}
        <Grid item xs={6} md={2}>
          <FormControl error={formik.touched.closet && Boolean(formik.errors.closet)}>
            <FormLabel>Clóset</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="closet"
              value={formik.values.closet}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.closet && formik.errors.closet && (
              <FormHelperText>{formik.errors.closet}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6} md={1} className='ps-0'>
          <CustomTextField
            type='number'
            fullWidth
            label='Ingrese la cantidad'
            disabled={formik.values.closet !== "si"}
            id="closetcount"
            value={formik.values.closetcount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.closetcount && Boolean(formik.errors.closetcount)}
            helperText={formik.touched.closetcount && formik.errors.closetcount}
          />
        </Grid>

        {/* Clóset de lino */}
        <Grid item xs={6} md={2}>
          <FormControl error={formik.touched.linencloset && Boolean(formik.errors.linencloset)}>
            <FormLabel>Clóset de lino</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="linencloset"
              value={formik.values.linencloset}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.linencloset && formik.errors.linencloset && (
              <FormHelperText>{formik.errors.linencloset}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6} md={1} className='ps-0'>
          <CustomTextField
            type='number'
            fullWidth
            label='Ingrese la cantidad'
            disabled={formik.values.linencloset !== "si"}
            id="linenclosetcount"
            value={formik.values.linenclosetcount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.linenclosetcount && Boolean(formik.errors.linenclosetcount)}
            helperText={formik.touched.linenclosetcount && formik.errors.linenclosetcount}
          />
        </Grid>

        {/* Vestier */}
        <Grid item xs={6} md={2}>
          <FormControl error={formik.touched.dressingroom && Boolean(formik.errors.dressingroom)}>
            <FormLabel>Vestier</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="dressingroom"
              value={formik.values.dressingroom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.dressingroom && formik.errors.dressingroom && (
              <FormHelperText>{formik.errors.dressingroom}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6} md={1} className='ps-0'>
          <CustomTextField
            type='number'
            fullWidth
            label='Ingrese la cantidad'
            disabled={formik.values.dressingroom !== "si"}
            id="dressingroomcount"
            value={formik.values.dressingroomcount || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dressingroomcount && Boolean(formik.errors.dressingroomcount)}
            helperText={formik.touched.dressingroomcount && formik.errors.dressingroomcount}
          />
        </Grid>

        {/* Bañera */}
        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.bathtub && Boolean(formik.errors.bathtub)}>
            <FormLabel>Bañera</FormLabel>
            <RadioGroup
              row className='gap-3'
              name="bathtub"
              value={formik.values.bathtub}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.bathtub && formik.errors.bathtub && (
              <FormHelperText>{formik.errors.bathtub}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Jacuzzi */}
        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.jacuzzi && Boolean(formik.errors.jacuzzi)}>
            <FormLabel>Jacuzzi</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="jacuzzi"
              value={formik.values.jacuzzi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.jacuzzi && formik.errors.jacuzzi && (
              <FormHelperText>{formik.errors.jacuzzi}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Chimenea */}
        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.chimney && Boolean(formik.errors.chimney)}>
            <FormLabel>Chimenea</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="chimney"
              value={formik.values.chimney}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.chimney && formik.errors.chimney && (
              <FormHelperText>{formik.errors.chimney}</FormHelperText>
            )}
          </FormControl>
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
                <CustomTextField {...params} placeholder='Ingrese la cantidad de cocinas'
                  label={`Cocina ${globalType === "vivienda" ? " *" : ""}`}
                  error={globalType === "vivienda" ?
                    formik.touched.type_kitchen && Boolean(formik.errors.type_kitchen)
                    : false
                  }
                />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />
            {globalType === "vivienda" && formik.touched.type_kitchen && formik.errors.type_kitchen && (
              <FormHelperText>{formik.errors.type_kitchen}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id="type_floor"
            value={formik.values.type_floor}
            onChange={(event, value) => {
              settype_floorOptions(value as string[]);
              formik.setFieldValue("type_floor", value);
            }}
            onBlur={formik.handleBlur}
            options={comercioDataString[globalType].Interno["Pisos"].map(
              (tipo: string) => tipo
            )}
            getOptionLabel={(option) => option || ""}
            renderInput={(params) => (
              <CustomTextField
                {...params}
                label="Pisos"
                error={formik.touched.type_floor && Boolean(formik.errors.type_floor)}
                helperText={formik.touched.type_floor && formik.errors.type_floor}
              />
            )}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  label={option}
                  size="small"
                  {...(getTagProps({ index }) as {})}
                  key={index}
                />
              ))
            }
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.lounge && Boolean(formik.errors.lounge)}>
            <FormLabel>Sala</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="lounge"
              value={formik.values.lounge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.lounge && formik.errors.lounge ? (
              <FormHelperText>{formik.errors.lounge}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.dining && Boolean(formik.errors.dining)}>
            <FormLabel>Comedor</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="dining"
              value={formik.values.dining}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.dining && formik.errors.dining ? (
              <FormHelperText>{formik.errors.dining}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.diningroom && Boolean(formik.errors.diningroom)}>
            <FormLabel>Sala comedor</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="diningroom"
              value={formik.values.diningroom}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.diningroom && formik.errors.diningroom ? (
              <FormHelperText>{formik.errors.diningroom}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.deck && Boolean(formik.errors.deck)}>
            <FormLabel>Deck</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="deck"
              value={formik.values.deck}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.deck && formik.errors.deck ? (
              <FormHelperText>{formik.errors.deck}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
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
            {formik.touched.has_a_balcony && formik.errors.has_a_balcony ? (
              <FormHelperText>{formik.errors.has_a_balcony}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
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
            {formik.touched.has_a_terrace && formik.errors.has_a_terrace ? (
              <FormHelperText>{formik.errors.has_a_terrace}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.hall && Boolean(formik.errors.hall)}>
            <FormLabel>Hall</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="hall"
              value={formik.values.hall}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.hall && formik.errors.hall ? (
              <FormHelperText>{formik.errors.hall}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.clotheszone && Boolean(formik.errors.clotheszone)}>
            <FormLabel>Zona de ropas</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="clotheszone"
              value={formik.values.clotheszone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.clotheszone && formik.errors.clotheszone ? (
              <FormHelperText>{formik.errors.clotheszone}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.yard && Boolean(formik.errors.yard)}>
            <FormLabel>Patio</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="yard"
              value={formik.values.yard}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.yard && formik.errors.yard ? (
              <FormHelperText>{formik.errors.yard}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.duplex && Boolean(formik.errors.duplex)}>
            <FormLabel>Duplex</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="duplex"
              value={formik.values.duplex}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.duplex && formik.errors.duplex ? (
              <FormHelperText>{formik.errors.duplex}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.loft && Boolean(formik.errors.loft)}>
            <FormLabel>Loft</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="loft"
              value={formik.values.loft}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.loft && formik.errors.loft ? (
              <FormHelperText>{formik.errors.loft}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl error={formik.touched.penthouse && Boolean(formik.errors.penthouse)}>
            <FormLabel>Penthouse</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="penthouse"
              value={formik.values.penthouse}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.penthouse && formik.errors.penthouse ? (
              <FormHelperText>{formik.errors.penthouse}</FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        <Grid item xs={6} md={6}>
          <FormControl error={formik.touched.securitydoor && Boolean(formik.errors.securitydoor)}>
            <FormLabel>Puerta de seguridad</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="securitydoor"
              value={formik.values.securitydoor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.securitydoor && formik.errors.securitydoor ? (
              <FormHelperText>{formik.errors.securitydoor}</FormHelperText>
            ) : null}
          </FormControl>
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

export default StepInternalFeaturesVivienda
