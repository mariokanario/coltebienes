// React Imports
import { useState } from 'react';

// Third-party Imports
import * as yup from "yup";
import { useFormik } from "formik";

// MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

// Component Imports
import { useProvider } from '@/components/context/Provider';
import CustomTextField from '@core/components/mui/TextField';
import CustomAutocomplete from '@core/components/mui/Autocomplete';
import DirectionalIcon from '@components/DirectionalIcon';
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker';

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
    otherspecifications: yup.array().of(yup.string().required("Eljie una opcion")).min(1, "Debe haber al menos una especificación"),
    landmarks: yup.string().required("Escriba lugares de referencia").min(5, "Debe de tener mínimo 5 letras"),
    observations: yup.string().required("Escriba otras características").min(5, "Debe de tener mínimo 5 letras"),
    collector: yup.string().required("Escriba el nombre del captador").min(5, "El nombre debe de tener mínimo 5 letras"),
    collectionmedium: yup.string().required("Escriba el medio de captación").min(5, "Debe de tener mínimo 5 letras"),
    collectiodate: yup.date().required("Agregue una fecha").nullable().transform((value, originalValue) => (originalValue === '' ? null : value)),
  })
  .required();

const StepSurroundings = ({ activeStep, handlePrev }: Props) => {

  const { globalType } = useProvider();
  const [surroundings, setSurroundings] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)

  const formik = useFormik({
    initialValues: {
      otherspecifications: surroundings,
      landmarks: "",
      observations: "",
      collector: "",
      collectionmedium: "",
      collectiodate: "",
    },
    validationSchema: SchemaHouse,
    onSubmit: (data) => {
      console.log(data);

    },
  });

  const { landmarks, observations, collector, collectionmedium } = formik.values;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={6}>
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
              value={formik.values.otherspecifications}
              onChange={(e, value) => {
                setSurroundings(value as string[])
                formik.setFieldValue('otherspecifications', value);
              }}
              onBlur={formik.handleBlur}
              id='otherspecifications'
              options={
                comercioDataString[globalType].Alrededores["Otras especificaciones"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} label='Otras especificaciones' error={formik.touched.otherspecifications && Boolean(formik.errors.otherspecifications)} />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />

            {formik.touched.otherspecifications && formik.errors.otherspecifications && (
              <FormHelperText>{formik.errors.otherspecifications}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            rows={4}
            multiline
            label='Mencione lugares de referencia'
            id="landmarks"
            value={landmarks}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.landmarks && formik.errors.landmarks ? formik.errors.landmarks : ''}
            error={formik.touched.landmarks && Boolean(formik.errors.landmarks)}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            rows={4}
            multiline
            label='Otras características y observaciones'
            id="observations"
            value={observations}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.observations && formik.errors.observations ? formik.errors.observations : ''}
            error={formik.touched.observations && Boolean(formik.errors.observations)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Captador'
            placeholder='Nombre'
            id="collector"
            value={collector}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.collector && formik.errors.collector ? formik.errors.collector : ''}
            error={formik.touched.collector && Boolean(formik.errors.collector)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Medio de captación'
            placeholder='Celular'
            id="collectionmedium"
            value={collectionmedium}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.collectionmedium && formik.errors.collectionmedium ? formik.errors.collectionmedium : ''}
            error={formik.touched.collectionmedium && Boolean(formik.errors.collectionmedium)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppReactDatepicker
            selected={date}
            placeholderText='YYYY-MM-DD'
            dateFormat={'yyyy-MM-dd'}
            id="collectiodate"
            value={formik.values.collectiodate || ''}
            onChange={(date: Date | null) => {
              formik.setFieldValue('collectiodate', date ? date.toISOString() : null);
              setDate(date);
            }}
            onBlur={formik.handleBlur}
            customInput={<CustomTextField error={formik.touched.collectiodate && Boolean(formik.errors.collectiodate)} fullWidth label='Fecha *' />}
          />
          {formik.touched.collectiodate && formik.errors.collectiodate && (
            <FormHelperText className='text-red-500'>{formik.errors.collectiodate}</FormHelperText>
          )}
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
              color='success'
              type='submit'
              endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />
              }
            >
              Finalizar
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )
}

export default StepSurroundings
