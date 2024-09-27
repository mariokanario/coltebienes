// React Imports
import { useEffect, useState } from 'react';

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
import { useForm } from '@/components/context/FormContext';
import { formDataInterface } from '@/components/context/FormDataInterface';
import save from '@/app/api/captaciones/save';
import { useRouter } from 'next/navigation';
import { AxiosResponse } from 'axios';
import { useAlert } from '@/components/AlertContext';
import Cookies from 'js-cookie';

const comercioDataString = comercioData as Record<string, any>;


type Props = {
  activeStep: number
  handleNext: () => void
  handlePrev: () => void
  steps: { title: string; subtitle: string }[]
}

const SchemaHouse = yup
  .object({
    otherspecificationsDings: yup.array().of(yup.string().required("Elige una opcion")).min(1, "Debe haber al menos una especificación"),
    landmarks: yup.string().required("Escriba lugares de referencia").min(5, "Debe de tener mínimo 5 letras"),
    observations: yup.string().required("Escriba otras características").min(5, "Debe de tener mínimo 5 letras"),
    collector_name: yup.string().required("Escriba el nombre del captador").min(5, "El nombre debe de tener mínimo 5 letras"),
    type_contact: yup.string().required("Escriba el metodo de contacto").min(5, "El metodo debe de tener mínimo 5 letras"),
    collection_medium: yup.string().required("Escriba el medio de captación").min(5, "Debe de tener mínimo 5 letras"),
    collection_date: yup.date().required("Agregue una fecha").nullable().transform((value, originalValue) => (originalValue === '' ? null : value)).max(new Date(), 'La fecha no puede ser mayor que la fecha actual'),
  })
  .required();

const StepSurroundings = ({ activeStep, handlePrev }: Props) => {

  const { globalType } = useProvider();
  const [surroundings, setSurroundings] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [send, setSend] = useState(false)
  const { formData, setFormData, resetFormSurro, setResetFormSurro, setResetFormAll } = useForm()
  const router = useRouter()
  const { showMessage } = useAlert()

  useEffect(() => {
    if (
      formik.values.otherspecificationsDings !== formData.otherspecificationsDings ||
      formik.values.landmarks !== formData.landmarks ||
      formik.values.observations !== formData.observations ||
      formik.values.collector_name !== formData.collector_name ||
      formik.values.collection_medium !== formData.collection_medium ||
      formik.values.collection_date !== formData.collection_date ||
      formik.values.type_contact !== formData.type_contact

    ) {
      formik.setValues({
        otherspecificationsDings: formData.otherspecificationsDings || [],
        landmarks: formData.landmarks || '',
        observations: formData.observations || '',
        collector_name: formData.collector_name || '',
        collection_medium: formData.collection_medium || '',
        collection_date: formData.collection_date || '',
        type_contact: formData.type_contact || ''
      })
    }
  }, [formData])

  const handlePrevStep = () => {
    setFormData((prevData) => ({
      ...prevData,
      ...formik.values,
    }))
    handlePrev()
  }

  function replaceSiNo(obj: any) {
    const newObj: any = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        newObj[key] = value.toLowerCase() === 'si' ? true : value.toLowerCase() === 'no' ? false : value;
      } else if (Array.isArray(value)) {
        newObj[key] = value.map(item =>
          typeof item === 'string' && item.toLowerCase() === 'si' ? true
            : typeof item === 'string' && item.toLowerCase() === 'no' ? false
              : item
        );
      } else if (typeof value === 'object' && value !== null) {
        newObj[key] = replaceSiNo(value);
      } else {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  const saveData = async () => {
    setResetFormAll(true)
    setResetFormSurro(true)
    try {
      const response = await save(formData) as AxiosResponse
      console.log("Respuesta:", response)
      if (response.status !== 200) {
        showMessage("Error, vuelve a iniciar sesión", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      } else {
        showMessage(response.data.message, "success")
      }
    } catch (error) {
      showMessage("Error, vuelve a iniciar sesión", "error")
      Cookies.remove("auth_token")
      router.push("/login")
    }
  }

  const formik = useFormik({
    initialValues: {
      otherspecificationsDings: surroundings,
      landmarks: "",
      observations: "",
      collector_name: "",
      collection_medium: "",
      collection_date: "",
      type_contact: ""
    },
    validationSchema: SchemaHouse,
    onSubmit: (values) => {
      console.log("Coleccion Surrounding")
      console.log(values)
      setFormData((prevData: formDataInterface) => {
        const updatedData = {
          ...prevData,
          ...values,
          status_complete: true
        }
        return updatedData
      });
      setSend(true);
    },
  });

  useEffect(() => {
    if (send) {
      saveData()
      setSend(false)
    }
  }, [send, formData])

  useEffect(() => {
    if (resetFormSurro === true) {
      formik.resetForm()
      setResetFormSurro(false)
    }
  }, [resetFormSurro])



  const { landmarks, observations, collector_name, collection_medium } = formik.values;
  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <FormControl
            error={
              formik.touched.otherspecificationsDings &&
              Boolean(formik.errors.otherspecificationsDings)
            }
            fullWidth
          >
            <CustomAutocomplete
              fullWidth
              multiple
              disableCloseOnSelect
              value={formik.values.otherspecificationsDings}
              onChange={(e, value) => {
                setSurroundings(value as string[])
                formik.setFieldValue('otherspecificationsDings', value);
              }}
              onBlur={formik.handleBlur}
              id='otherspecificationsDings'
              options={
                comercioDataString[globalType].Alrededores["Alrededores"].map((tipo: string) => (tipo))
              }
              getOptionLabel={option => option || ''}
              renderInput={params => <CustomTextField {...params} label='Alrededores' placeholder='Seleccione sus alrededores' error={formik.touched.otherspecificationsDings && Boolean(formik.errors.otherspecificationsDings)} />}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
                ))
              }
            />

            {formik.touched.otherspecificationsDings && formik.errors.otherspecificationsDings && (
              <FormHelperText>{formik.errors.otherspecificationsDings}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            fullWidth
            rows={4}
            multiline
            label='Lugares de referencia'
            placeholder='Mencione lugares de referencia'
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
            label='Características y observaciones'
            placeholder='Ingrese otras características y observaciones'
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
            placeholder='Ingrese el nombre del captador'
            id="collector_name"
            value={collector_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.collector_name && formik.errors.collector_name ? formik.errors.collector_name : ''}
            error={formik.touched.collector_name && Boolean(formik.errors.collector_name)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Medio de captación'
            placeholder='Ingrese el medio de captación'
            id="collection_medium"
            value={collection_medium}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.collection_medium && formik.errors.collection_medium ? formik.errors.collection_medium : ''}
            error={formik.touched.collection_medium && Boolean(formik.errors.collection_medium)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Medio de contacto (Whatsapp, correo, teléfono)'
            placeholder='Ingrese el medio de contacto'
            id="type_contact"
            value={formik.values.type_contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.type_contact && formik.errors.type_contact ? formik.errors.type_contact : ''}
            error={formik.touched.type_contact && Boolean(formik.errors.type_contact)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppReactDatepicker
            selected={date}
            placeholderText='YYYY-MM-DD'
            dateFormat='yyyy-MM-dd'
            id="collection_date"
            maxDate={new Date()}
            value={formik.values.collection_date ? new Date(formik.values.collection_date).toISOString().split('T')[0] : ''}
            onChange={(date: Date | null) => {
              const formattedDate = date ? new Date(date).toISOString().split('T')[0] : null;
              formik.setFieldValue('collection_date', formattedDate);
              setDate(date);
            }}
            onBlur={formik.handleBlur}
            customInput={<CustomTextField error={formik.touched.collection_date && Boolean(formik.errors.collection_date)} fullWidth label='Fecha de registro' />}
          />
          {formik.touched.collection_date && formik.errors.collection_date && (
            <FormHelperText className='text-red-500'>{formik.errors.collection_date}</FormHelperText>
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
