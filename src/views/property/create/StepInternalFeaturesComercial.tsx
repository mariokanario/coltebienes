// React Imports
import { useState } from 'react';

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

const comercioDataString = comercioData as Record<string, any>;


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}


const SchemaHouse = yup
  .object({
    kitchen: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),
    propertystatus: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),
    roomsnum: yup.string().required("Agregue un valor"),
    bathroomnum: yup.string().required("Agregue un valor"),
    garagenum: yup.string().required("Agregue un valor"),


  })
  .required();

const SchemaBuild = yup
  .object({
    propertystatus: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),
    energy: yup.string().required("Elije una opción"),
    bathroomnum: yup.string().required("Agregue un valor"),
    garagenum: yup.string().required("Agregue un valor"),

  })
  .required();

const StepInternalFeaturesComercial = ({ activeStep, handlePrev }: Props) => {

  // States
  const { globalType } = useProvider();
  const [kitchenDetails, setKitchenDetails] = useState<string[]>([])
  const [propertyStatusOption, setPropertyStatusOption] = useState<string[]>([])
  const [otherSpecifications, setOtherSpecifications] = useState<string[]>([])
  const [energyOptions, setEnergyOptions] = useState<string[]>([])
  const [floorsOptions, setFloorsOptions] = useState<string[]>([])
  const [coveredFini, setCoveredFini] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])
  const validationSchemaVar = globalType === "vivienda" ? SchemaHouse : SchemaBuild;

  const initialValues = globalType === "vivienda"
    ? {
      coveredfinishes: coveredFini,
      heightmeters: "",
      bathtub: "",
      jacuzzi: "",
      chimney: "",
      closet: "",
      linencloset: "",
      dressingroom: "",
      kitchen: kitchenDetails,
      propertystatus: propertyStatusOption,
      dining: "",
      diningroom: "",
      penthouse: "",
      yard: "",
      clotheszone: "",
      floors: floorsOptions,
      hall: "",
      lounge: "",
      balcony: "",
      terrace: "",
      deck: "",
      duplex: "",
      loft: "",
      securitydoor: "",
      roomsnum: '',
      bathroomnum: '',
      garagenum: '',

    }
    :
    {
      coveredfinishes: coveredFini,
      heightmeters: "",
      depthmeters: "",
      frontmeters: "",
      kitchen: kitchenDetails,
      propertystatus: propertyStatusOption,
      energy: energyOptions,
      others: otherSpecifications,
      winery: "",
      floors: floorsOptions,
      balcony: "",
      terrace: "",
      airconditioning: "",
      centralair: "",
      surveillance: watch,
      bathroomnum: '',
      garagenum: '',

    }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaVar,
    onSubmit: (data) => {
      console.log(data);

    },
  });

  const {
    heightmeters, depthmeters, frontmeters, roomsnum, bathroomnum, garagenum
  } = formik.values;


  return (
    <form onSubmit={formik.handleSubmit}>
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
            renderInput={params => <CustomTextField {...params} label='Acabados cubierta' />}
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
            placeholder='3'
            id="heightmeters"
            value={heightmeters}
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
          <CustomTextField
            fullWidth
            type='number'
            label='Fondo en metros'
            placeholder='3'
            id="depthmeters"
            value={depthmeters}
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
          <CustomTextField
            fullWidth
            type='number'
            label='Frente en metros'
            placeholder='3'
            id="frontmeters"
            value={frontmeters}
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
                formik.touched.kitchen &&
                Boolean(formik.errors.kitchen)
                :
                false
            }
            fullWidth
          >
            <CustomAutocomplete
              fullWidth
              multiple
              disableCloseOnSelect
              value={formik.values.kitchen}
              onChange={(event, value) => {
                setKitchenDetails(value as string[])
                formik.setFieldValue('kitchen', value);
              }}
              id='kitchen'
              options={
                comercioDataString[globalType].Interno.Cocina.map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params =>
                <CustomTextField {...params}
                  label={`Cocina ${globalType === "vivienda" ? " *" : ""}`}
                  error={globalType === "vivienda" ?
                    formik.touched.kitchen && Boolean(formik.errors.kitchen)
                    : false
                  }
                />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />
            {globalType === "vivienda" && formik.touched.kitchen && formik.errors.kitchen && (
              <FormHelperText>{formik.errors.kitchen}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl
            error={
              formik.touched.propertystatus &&
              Boolean(formik.errors.propertystatus)
            }
            fullWidth
          >
            <CustomAutocomplete
              fullWidth
              multiple
              disableCloseOnSelect
              value={formik.values.propertystatus}
              onChange={(event, value) => {
                setPropertyStatusOption(value as string[])
                formik.setFieldValue('propertystatus', value);
              }}
              id='propertystatus'
              options={
                comercioDataString[globalType].Interno["Estado del inmueble"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} label='Estado del inmueble *' error={formik.touched.propertystatus && Boolean(formik.errors.propertystatus)} />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />

            {formik.touched.propertystatus && formik.errors.propertystatus && (
              <FormHelperText>{formik.errors.propertystatus}</FormHelperText>
            )}

          </FormControl>
        </Grid>



        <Grid item xs={12} md={6}>

          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='energy'
            value={formik.values.energy}
            onChange={(event, value) => {
              setEnergyOptions(value as string[])
              formik.setFieldValue('energy', value);

            }}
            onBlur={formik.handleBlur}
            options={
              comercioDataString[globalType].Interno["Energía"].map((tipo: string) => (tipo))
            }
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Energía' />}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }

          />

        </Grid>
        {/*  <Grid item xs={2} md={2}>
                <CustomTextField
                  type='number'
                  fullWidth
                  label='Cantidad'
                  disabled={!amountEnergyActive ? true : false}
                  id="amountenergy"
                  value={amountenergy}
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
            renderInput={params => <CustomTextField {...params} label='Otras especificaciones' error={formik.touched.others && Boolean(formik.errors.others)} />}
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
            value={formik.values.winery}
            onChange={formik.handleChange}
          >
            <MenuItem value=''>Seleccione tipo de bodega</MenuItem>
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
            id='floors'
            value={formik.values.floors}
            onChange={(event, value) => {
              setFloorsOptions(value as string[])
              formik.setFieldValue('floors', value);

            }}
            onBlur={formik.handleBlur}
            options={
              comercioDataString[globalType].Interno["Pisos"].map((tipo: string) => (tipo))
            }
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Pisos' />}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }
          />

        </Grid>



        <Grid item xs={6} md={6}>
          <FormControl>
            <FormLabel>Balcón</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="balcony"
              value={formik.values.balcony}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>


        <Grid item xs={12} md={6}>
          <FormControl>
            <FormLabel>Terraza</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="terrace"
              value={formik.values.terrace}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>



        <Grid item xs={12} md={6}>
          <FormControl>
            <FormLabel>Aire acondicionado</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="airconditioning"
              value={formik.values.airconditioning}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl>
            <FormLabel>Aire central</FormLabel>
            <RadioGroup
              row
              className='gap-3'
              name="centralair"
              value={formik.values.centralair}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
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
            renderInput={params => <CustomTextField {...params} label='Vigilancia' />}
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
    </form >
  )
}

export default StepInternalFeaturesComercial
