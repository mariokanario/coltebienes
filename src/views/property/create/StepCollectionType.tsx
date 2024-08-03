// React Imports
import type { ChangeEvent } from 'react';

// Third-party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';

// MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

// Component Imports
import { useProvider } from '@/components/context/Provider';
import CustomInputVertical from '@core/components/custom-inputs/Vertical';
import DirectionalIcon from '@components/DirectionalIcon';
import CustomTextField from '@core/components/mui/TextField';


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}


const Schema = yup
  .object({
    name: yup
      .string()
      .required("El nombre es obligatorio")
      .min(5, "El nombre debe tener mínimo 5 letras"),
    cellphone: yup
      .string()
      .required("El teléfono es obligatorio")
      .min(5, "El teléfono debe de tener mínimo 5 letras")
      .typeError("El teléfono es obligatorio"),
    email: yup
      .string()
      .required("El correo es obligatorio")
      .min(5, "El correo debe de tener mínimo 5 letras")
      .email("Ingresa un correo válido"),
    authorization: yup
      .string()
      .required("Seleccione una opción")
  })
  .required();

const StepCollectionType = ({ activeStep, handleNext, handlePrev, steps }: Props) => {

  const { globalType, setGlobalType } = useProvider();

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'string') {
      setGlobalType(prop)

    } else {
      setGlobalType((prop.target as HTMLInputElement).value)

    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      cellphone: "",
      email: "",
      authorization: "",
    },
    validationSchema: Schema,
    onSubmit: (data) => {
      console.log(data);
      handleNext();
    },
  });

  const { name, cellphone, email } = formik.values;


  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={6}>

        <CustomInputVertical
          type='radio'
          gridProps={{ sm: 6, xs: 12 }}
          selected={globalType}
          name='custom-radios-basic'
          handleChange={handleOptionChange}
          data={{
            asset: <i className='tabler-building text-[28px]' />,
            value: 'comercio',
            title: 'Comercio'
          }}
        />

        <CustomInputVertical
          type='radio'
          gridProps={{ sm: 6, xs: 12 }}
          selected={globalType}
          name='custom-radios-basic'
          handleChange={handleOptionChange}
          data={{
            asset: <i className='tabler-home-2 text-[28px]' />,
            value: 'vivienda',
            title: 'Vivienda'
          }}
        />

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Nombre del propietario'
            placeholder='Nombre'
            id="name"
            value={name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Celular del propietario'
            placeholder='Celular'
            id="cellphone"
            value={cellphone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.cellphone && formik.errors.cellphone ? formik.errors.cellphone : ''}
            error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Correo del propietario'
            placeholder='Correo'
            id="email"
            value={email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={formik.touched.authorization && Boolean(formik.errors.authorization)}>
            <FormLabel>¿Autoriza publicar en portales web? (Mercadolibre, Metrocuadrado, Fincaraiz, Coltebienes) </FormLabel>
            <RadioGroup
              row className='gap-2'
              name="authorization"
              value={formik.values.authorization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.authorization && formik.errors.authorization && (
              <FormHelperText>{formik.errors.authorization}</FormHelperText>
            )}
          </FormControl>
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

export default StepCollectionType
