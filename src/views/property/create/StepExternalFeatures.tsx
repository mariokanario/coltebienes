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
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

// Component Imports
import { useProvider } from '@/components/context/Provider';
import CustomTextField from '@core/components/mui/TextField';
import DirectionalIcon from '@components/DirectionalIcon';
import CustomAutocomplete from '@core/components/mui/Autocomplete';

// JSON Imports
import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json';

const comercioDataString = comercioData as Record<string, any>;



type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}


const Schema = yup
  .object({
    numberlevels: yup.string().required("Elije una opción"),
    onfloor: yup.string().required("Elije una opción"),
    otherspecifications: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),

  })
  .required();

const StepExternalFeatures = ({ activeStep, handlePrev }: Props) => {

  const { globalType } = useProvider();
  const [front, setFront] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<string[]>([])
  const [specificationsAmount, setSpecificationsAmount] = useState<{ [key: string]: string }>({})
  const [watch, setWatch] = useState<string[]>([])
  const [commonZonesOption, setCommonZonesOption] = useState<string[]>([])

  const initialValues = globalType === "vivienda"
    ? {
      usefulroom: '',
      exposedbrick: '',
      numberlevels: '',
      onfloor: '',
      otherspecifications: specifications,
      specificationsAmount,
      parking: '',
      surveillance: watch,
      commonzones: commonZonesOption,
    }
    : {
      industrialpark: '',
      parkingbay: '',
      communalbathrooms: '',
      publictoilets: '',
      leveldock: '',
      depresseddock: '',
      loadingcapacity: '',
      bridgecrane: '',
      usefulroom: '',
      digitalaccess: '',
      facade: front,
      amouncapacity: '',
      numberlevels: '',
      onfloor: '',
      otherspecifications: specifications,
      specificationsAmount,
      parking: '',
      unit: '',
      surveillance: watch,
      commonzones: commonZonesOption,
    };

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
    validationSchema: Schema,
    onSubmit: (data) => {
      data = { ...data, specificationsAmount }
      console.log(data);
    },
  });

  const {
    numberlevels, onfloor, amouncapacity, otherspecifications
  } = formik.values;

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
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
                      name="industrialpark"
                      value={formik.values.industrialpark}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Bahia de parqueo</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="parkingbay"
                      value={formik.values.parkingbay}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Baños comunales</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="communalbathrooms"
                      value={formik.values.communalbathrooms}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Baños públicos</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="publictoilets"
                      value={formik.values.publictoilets}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Muelle a nivel</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="leveldock"
                      value={formik.values.leveldock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Muelle deprimido</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="depresseddock"
                      value={formik.values.depresseddock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
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
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Cuarto útil</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="usefulroom"
                      value={formik.values.usefulroom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
                    <FormLabel>Acceso digital en edificio</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="digitalaccess"
                      value={formik.values.digitalaccess}
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
                  <CustomAutocomplete
                    fullWidth
                    multiple
                    disableCloseOnSelect
                    value={formik.values.facade}
                    onChange={(event, value) => {
                      setFront(value as string[])
                      formik.setFieldValue('facade', value);
                    }
                    }
                    id='facade'
                    options={
                      comercioDataString[globalType].Externo["Fachada"].map((tipo: string) => (tipo))
                    }
                    getOptionLabel={option => option || ''}
                    renderInput={params => <CustomTextField {...params} label='Fachada' />}
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
                  <FormControl>
                    <FormLabel>Cuarto útil</FormLabel>
                    <RadioGroup
                      row
                      className='gap-3'
                      name="usefulroom"
                      value={formik.values.usefulroom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <FormControlLabel value='si' control={<Radio />} label='Si' />
                      <FormControlLabel value='no' control={<Radio />} label='No' />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl>
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
                  </FormControl>
                </Grid>
              </>
          }

          <Grid item xs={12} md={6}>
            <CustomTextField
              type='number'
              fullWidth
              label='Cantidad de niveles *'
              id="numberlevels"
              value={numberlevels}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.numberlevels && formik.errors.numberlevels ? formik.errors.numberlevels : ''}
              error={formik.touched.numberlevels && Boolean(formik.errors.numberlevels)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              type='number'
              fullWidth
              label='En el piso número *'
              id="onfloor"
              value={onfloor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.onfloor && formik.errors.onfloor ? formik.errors.onfloor : ''}
              error={formik.touched.onfloor && Boolean(formik.errors.onfloor)}
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
                  setSpecifications(value as string[])
                  formik.setFieldValue('otherspecifications', value);
                }
                }
                id='otherspecifications'
                options={
                  comercioDataString[globalType].Externo["Otras especificaciones"].map((tipo: string) => (tipo))
                }
                getOptionLabel={option => option || ''}
                renderInput={params => <CustomTextField {...params} label='Otras especificaciones *' error={formik.touched.otherspecifications && Boolean(formik.errors.otherspecifications)} />}
                renderTags={(value: string[], getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                  ))
                }
              />
            </FormControl>
          </Grid>

          {
            otherspecifications?.map((item, index) => (
              <Grid key={index} item xs={6} md={3}>
                <CustomTextField
                  type='number'
                  fullWidth
                  label={`Cantidad ${item}`}
                  id={othersAmount[item]}
                  value={specificationsAmount[item]}
                  onChange={(e) => {
                    const { id, value } = e.target;
                    setSpecificationsAmount(prev => ({
                      ...prev,
                      [id]: value
                    }));
                    formik.handleChange(e);
                  }}

                  onBlur={formik.handleBlur}
                />
              </Grid>
            ))
          }



          <Grid item xs={12} md={12}>
            <hr className="w-full h-px bg-gray-100" />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomTextField
              select
              fullWidth
              label='Parqueadero'
              aria-describedby='parqueadero'
              defaultValue=''
              id="parking"
              name="parking"
              value={formik.values.parking}
              onChange={formik.handleChange}
            >
              <MenuItem value=''>Seleccione parqueadero</MenuItem>
              {
                comercioDataString[globalType].Externo['Parqueadero'].map((tipo: string, index: number) => (
                  <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
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
                  id="unit"
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                >
                  <MenuItem value=''>Seleccione unidad</MenuItem>
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
              id='surveillance'
              value={formik.values.surveillance}
              onChange={(event, value) => {
                setWatch(value as string[])
                formik.setFieldValue('surveillance', value);
              }}
              onBlur={formik.handleBlur}
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

          <Grid item xs={12} md={6}>
            <CustomAutocomplete
              fullWidth
              multiple
              disableCloseOnSelect
              id='commonzones'
              value={formik.values.commonzones}
              onChange={(event, value) => {
                setCommonZonesOption(value as string[])
                formik.setFieldValue('commonzones', value);

              }}
              onBlur={formik.handleBlur}
              options={
                comercioDataString[globalType].Externo["Zonas comunes"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} label='Zonas comunes' />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />
          </Grid>

          <Grid item xs={3} md={3}>
            <FormControl>
              <FormLabel>Capacidad de carga de t/m² del piso</FormLabel>
              <RadioGroup
                row
                className='gap-3'
                name="loadingcapacity"
                value={formik.values.loadingcapacity}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <FormControlLabel value='si' control={<Radio />} label='Si' />
                <FormControlLabel value='no' control={<Radio />} label='No' />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={3} md={3}>
            <CustomTextField
              type='number'
              fullWidth
              label='Cantidad'
              disabled={formik.values.loadingcapacity == "si" ? false : true}
              id="amouncapacity"
              value={amouncapacity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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

export default StepExternalFeatures
