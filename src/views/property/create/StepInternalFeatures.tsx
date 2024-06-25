// React Imports
import { useState } from 'react'
import { useProvider } from '@/components/context/Provider';
import * as yup from "yup";
import { useFormik } from "formik";

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
import FormHelperText from '@mui/material/FormHelperText'


import comercioData from '@/app/api/fake-db/apps/form-list/comercioData.json'
const comercioDataString = comercioData as Record<string, any>

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

  })
  .required();

const SchemaBuild = yup
  .object({
    propertystatus: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),
    energy: yup.string().required("Elije una opción"),
  })
  .required();

const StepInternalFeatures = ({ activeStep, handlePrev }: Props) => {

  // States
  const { globalType } = useProvider();
  const [kitchenDetails, setKitchenDetails] = useState<string[]>([])
  const [propertyStatusOption, setPropertyStatusOption] = useState<string[]>([])
  const [otherSpecifications, setOtherSpecifications] = useState<string[]>([])
  const [watch, setWatch] = useState<string[]>([])
  const validationSchemaVar = globalType === "vivienda" ? SchemaHouse : SchemaBuild;

  const initialValues = globalType === "vivienda"
    ? {
      coveredfinishes: "",
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
      floors: "",
      hall: "",
      lounge: "",
      balcony: "",
      terrace: "",
      deck: "",
      duplex: "",
      loft: "",
      securitydoor: "",
    }
    :
    {
      coveredfinishes: "",
      heightmeters: "",
      depthmeters: "",
      frontmeters: "",
      kitchen: kitchenDetails,
      propertystatus: propertyStatusOption,
      energy: "",
      others: otherSpecifications,
      winery: "",
      floors: "",
      balcony: "",
      terrace: "",
      airconditioning: "",
      centralair: "",
      surveillance: watch,
    }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchemaVar,
    onSubmit: (data) => {
      console.log(data);

    },
  });

  const {
    heightmeters, depthmeters, frontmeters
  } = formik.values;


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Acabados cubierta'
            defaultValue=''
            name="coveredfinishes"
            value={formik.values.coveredfinishes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <MenuItem value=''>Seleccione acabados cubierta</MenuItem>
            {
              comercioDataString[globalType].Interno['Acabados cubierta'].map((tipo: string) => (
                <MenuItem value={tipo}> {tipo} </MenuItem>
              ))
            }
          </CustomTextField>
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

        {
          globalType == "comercio" ?
            <>
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
            </>
            : null
        }

        {
          globalType == "vivienda" ?
            <>
              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>
            </>
            : null
        }


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

        {
          globalType == "vivienda" ?
            <>
              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControl>
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
                </FormControl>
              </Grid>
            </>
            : null
        }

        {
          globalType == "comercio" ?
            <>
              <Grid item xs={12} md={6}>
                <CustomTextField
                  select
                  fullWidth
                  label='Energía *'
                  defaultValue=''
                  id="energy"
                  name="energy"
                  value={formik.values.energy}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.energy && formik.errors.energy ? formik.errors.energy : ''}
                  error={formik.touched.energy && Boolean(formik.errors.energy)}
                >
                  <MenuItem value=''>Seleccione estado</MenuItem>
                  {
                    comercioDataString[globalType].Interno['Energía'].map((tipo: string) => (
                      <MenuItem value={tipo}> {tipo} </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>


              <Grid item xs={12} md={6}>

                <CustomAutocomplete
                  fullWidth
                  multiple
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
                      <MenuItem value={tipo}> {tipo} </MenuItem>
                    ))
                  }
                </CustomTextField>
              </Grid>
            </>
            : null
        }

        <Grid item xs={12} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Pisos'
            defaultValue=''
            id="floors"
            name="floors"
            value={formik.values.floors}
            onChange={formik.handleChange}
          >
            <MenuItem value=''>Seleccione tipo de pisos</MenuItem>
            {
              comercioDataString[globalType].Interno['Pisos'].map((tipo: string) => (
                <MenuItem value={tipo}> {tipo} </MenuItem>
              ))
            }
          </CustomTextField>
        </Grid>


        {
          globalType == "vivienda" ?
            <>
              <Grid item xs={6} md={6}>
                <FormControl>
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
                </FormControl>
              </Grid>

              <Grid item xs={6} md={6}>
                <FormControl>
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
                </FormControl>
              </Grid>
            </>
            : null
        }



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

        {
          globalType == "vivienda" ?
            <Grid item xs={6} md={6}>
              <FormControl>
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
              </FormControl>
            </Grid>
            : null
        }


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


        {
          globalType == "comercio" ?
            <>
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
            </>
            : null
        }

        {
          globalType == "vivienda" ?
            <>
              <Grid item xs={6} md={6}>
                <FormControl>
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
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl>
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
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6}>
                <FormControl>
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
                </FormControl>
              </Grid>
            </>
            : null
        }


        {
          globalType == "comercio" ?
            <Grid item xs={12} md={6}>
              <CustomAutocomplete
                fullWidth
                multiple
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
            : null
        }


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
  )
}

export default StepInternalFeatures
