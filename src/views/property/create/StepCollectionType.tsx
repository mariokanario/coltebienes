// React Imports
import { useEffect, useState, type ChangeEvent } from 'react'

// Third-party Imports
import * as yup from 'yup'
import { useFormik } from 'formik'

// MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { initialFormData, useForm } from '../../../components/context/FormContext'
import { useRouter } from 'next/navigation'

// Component Imports
import { useProvider } from '@/components/context/Provider'
import CustomInputVertical from '@core/components/custom-inputs/Vertical'
import DirectionalIcon from '@components/DirectionalIcon'
import CustomTextField from '@core/components/mui/TextField'
import show from '@/app/api/captaciones/show'
import { Dialog, DialogTitle, DialogContent, DialogActions, Chip } from '@mui/material'
import { formDataInterface } from '@/components/context/FormDataInterface'
import searchDocument from '@/app/api/login/searchDocument'
import Cookies from 'js-cookie'
import { useAlert } from '@/components/AlertContext'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
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
    name: yup
      .string()
      .required("El nombre es obligatorio")
      .min(5, "El nombre debe tener mínimo 5 letras"),
    cellphone: yup
      .string()
      .matches(/^[0-9]*$/, 'Solo se permiten números')
      .required('El número de celular es obligatorio')
      .min(5, 'El número de celular debe tener al menos 5 dígitos'),
    owner_identification: yup
      .string()
      .matches(/^[0-9]*$/, 'Solo se permiten números')
      .required('El número de identificación es obligatorio')
      .min(5, 'El número de identificación debe tener al menos 5 dígitos'),
    owner_email: yup
      .string()
      .required("El correo es obligatorio")
      .min(5, "El correo debe de tener mínimo 5 letras")
      .email("Ingresa un correo válido"),
    authorizes_publishing: yup
      .string()
      .required("Seleccione una opción"),
    type_contact: yup.array().of(yup.string()).min(1, "Elige al menos una opción").required("Este campo es requerido"),

  })
  .required()

const StepCollectionType = ({ activeStep, handleNext, handlePrev, steps }: Props) => {
  const { formData, setFormData, setResetFormType, resetFormType } = useForm();
  const { globalType, setGlobalType } = useProvider()
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [typeContact, setTypeContact] = useState<string[]>([])
  const [formDataLocal, setFormDataLocal] = useState<formDataInterface>(initialFormData)
  const { showMessage } = useAlert()
  const router = useRouter()

  //const { handleRefreshToken } = useHandleRefreshToken()

  useEffect(() => {
    //handleRefreshToken()
    if (formData.owner_identification === "") {
      handleGetDataIncomplete()
    }
  }, [])

  const handleGetDataIncomplete = async () => {
    try {
      const { data: { number_document } } = await searchDocument()
      const { status, data } = await show(number_document)
      if (status === 200) {
        setConfirmOpen(true)
        setFormDataLocal(data)
      }
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        showMessage("Error, vuelve a iniciar sesión", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      } else {
        console.error("Error fetching incomplete data:", error)
        showMessage("Ocurrió un error al obtener los datos.", "error")
        Cookies.remove("auth_token")
        router.push("/login")
      }
    }
  };

  const hadleSubmitCompleteData = () => {
    handleOptionChange(formDataLocal.globaltype)
    const updatedFormData = {
      ...formDataLocal,
      type_contact: typeof formDataLocal.type_contact === 'string'
        ? JSON.parse(formDataLocal.type_contact)
        : formDataLocal.type_contact
    };

    setFormData(updatedFormData);
    setFormDataLocal(initialFormData)
    setConfirmOpen(false)
  }

  const handleOptionChange = (prop: string | ChangeEvent<HTMLInputElement> | undefined) => {
    if (typeof prop === 'string') {
      setGlobalType(prop)
    } else {
      setGlobalType((prop?.target as HTMLInputElement).value)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      cellphone: "",
      owner_email: "",
      authorizes_publishing: "",
      owner_identification: "",
      globaltype: "",
      type_contact: typeContact,
      publication_status: ""

    },
    validationSchema: Schema,
    onSubmit: (values) => {
      setFormData((prevData) => ({
        ...prevData,
        ...values,
        globaltype: globalType
      }))
      handleNext()
    },
  })

  useEffect(() => {
    if (
      formik.values.name !== formData.name ||
      formik.values.cellphone !== formData.cellphone ||
      formik.values.owner_email !== formData.owner_email ||
      formik.values.authorizes_publishing !== formData.authorizes_publishing ||
      formik.values.owner_identification !== formData.owner_identification ||
      formik.values.globaltype !== formData.globaltype ||
      formik.values.type_contact !== formData.type_contact ||
      formik.values.publication_status !== formData.publication_status

    ) {
      formik.setValues({
        name: formData.name || '',
        cellphone: formData.cellphone || '',
        owner_email: formData.owner_email || '',
        authorizes_publishing: formData.authorizes_publishing || '',
        owner_identification: formData.owner_identification || '',
        globaltype: formData.globaltype || '',
        type_contact: formData.type_contact || [],
        publication_status: formData.publication_status || "",

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

  useEffect(() => {
    if (resetFormType === true) {
      formik.resetForm()
      setResetFormType(false)
    }
  }, [resetFormType])


  const { name, cellphone, owner_email, owner_identification } = formik.values

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
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
            placeholder='Ingrese su nombre'
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
            placeholder='Ingrese número de celular'
            id="cellphone"
            value={cellphone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.cellphone && formik.errors.cellphone ? formik.errors.cellphone : ''}
            error={formik.touched.cellphone && Boolean(formik.errors.cellphone)}
            inputProps={{
              pattern: "^[0-9]*$"
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Número de identificación'
            placeholder='Ingrese número de identificación'
            id="owner_identification"
            value={owner_identification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.owner_identification && formik.errors.owner_identification ? formik.errors.owner_identification : ''}
            error={formik.touched.owner_identification && Boolean(formik.errors.owner_identification)}
            inputProps={{
              pattern: "^[0-9]*$"
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Correo del propietario'
            placeholder='Ingrese su correo electrónico'
            id="owner_email"
            value={owner_email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.owner_email && formik.errors.owner_email ? formik.errors.owner_email : ''}
            error={formik.touched.owner_email && Boolean(formik.errors.owner_email)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutocomplete
            fullWidth
            multiple
            disableCloseOnSelect
            id='type_contact'
            value={formik.values.type_contact}
            onChange={(event, value) => {
              setTypeContact(value as string[])
              formik.setFieldValue('type_contact', value);
            }}
            options={
              comercioDataString?.[globalType]?.Datos?.["Tipo de contacto"]?.map(
                (tipo: string) => tipo
              ) || []
            }
            getOptionLabel={option => option || ''}
            renderInput={params => <CustomTextField {...params} label='Tipo de contacto' error={Boolean(formik.touched.type_contact && formik.errors.type_contact)}
              helperText={formik.touched.type_contact && formik.errors.type_contact ? formik.errors.type_contact : ""} placeholder='Seleccione el tipo de contacto' />
            }
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip label={option} size='small' {...(getTagProps({ index }) as {})} key={index} />
              ))
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl error={formik.touched.authorizes_publishing && Boolean(formik.errors.authorizes_publishing)}>
            <FormLabel>¿Autoriza publicar en portales web? (Mercadolibre, Metrocuadrado, Fincaraiz, Coltebienes)</FormLabel>
            <RadioGroup
              row
              className='gap-2'
              name="authorizes_publishing"
              value={formik.values.authorizes_publishing}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <FormControlLabel value='si' control={<Radio />} label='Si' />
              <FormControlLabel value='no' control={<Radio />} label='No' />
            </RadioGroup>
            {formik.touched.authorizes_publishing && formik.errors.authorizes_publishing && (
              <FormHelperText>{formik.errors.authorizes_publishing}</FormHelperText>
            )}
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
              color={activeStep === steps.length - 1 ? 'success' : 'primary'}
              type='submit'
              endIcon={<DirectionalIcon ltrIconClass='tabler-arrow-right' rtlIconClass='tabler-arrow-left' />}
            >
              Siguiente
            </Button>
          </div>
        </Grid>
      </Grid>
      <Dialog
        open={confirmOpen}
        onClose={() => {
          setFormData(initialFormData)
          setConfirmOpen(false)
        }}
      >
        <DialogTitle>Confirmar carga de datos</DialogTitle>
        <DialogContent>
          Tiene un formulario en curso.
          ¿Desea continuar con el formulario?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setFormData(initialFormData)
            setConfirmOpen(false)
          }} color="primary">
            Cancelar
          </Button>
          <Button onClick={hadleSubmitCompleteData} color="secondary">
            Cargar datos
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}

export default StepCollectionType
