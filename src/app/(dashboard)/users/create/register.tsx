import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import * as yup from "yup";
import { useFormik } from "formik";
import CustomTextField from '@core/components/mui/TextField';
import { InputAdornment, IconButton, MenuItem } from '@mui/material';
import register from '@/app/api/register/register';
import userData from '@/app/api/fake-db/apps/user-list/userData.json';
import { userDataInterface } from './users';
import updateUser from '@/app/api/login/update';
import { useAlert } from '@/components/AlertContext';



const SchemaHouseUpdate = yup
  .object({
    password: yup
      .string()
      .min(5, "Debe de tener mínimo 5 letras")
      .test('password-required', 'Escriba su clave', function (value) {
        const { passwordConfirm } = this.parent;
        if (value || passwordConfirm) {
          return !!value;
        }
        return true;
      }),
    passwordConfirm: yup
      .string()
      .min(5, "Debe de tener mínimo 5 letras")
      .test('passwordConfirm-required', 'Escriba de nuevo su clave', function (value) {
        const { password } = this.parent;
        if (value || password) {
          return !!value;
        }
        return true;
      })
      .test('passwords-match', 'Las claves deben ser iguales', function (value) {
        return this.parent.password === value;
      }),
    name: yup.string().required("Escriba su nombre").min(5, "El nombre debe de tener mínimo 5 letras"),
    role: yup.string().required("Elige un rol"),
    status: yup.string().required("Elige un estado"),
    email: yup.string().required("El correo es obligatorio").min(5, "El correo debe de tener mínimo 5 letras").email("Ingresa un correo válido"),
  })
  .required();

const SchemaHouseRegister = yup
  .object({
    password: yup.string().required("Escriba su clave").oneOf([yup.ref('passwordConfirm')], 'Las claves deben ser iguales').min(5, "Debe de tener mínimo 5 letras"),
    passwordConfirm: yup.string().required("Escriba de nuevo su clave").oneOf([yup.ref('password')], 'Las claves deben ser iguales').min(5, "Debe de tener mínimo 5 letras"),
    name: yup.string().required("Escriba su nombre").min(5, "El nombre debe de tener mínimo 5 letras"),
    role: yup.string().required("Elige un rol"),
    status: yup.string().required("Elige un estado "),
    email: yup.string().required("El correo es obligatorio").min(5, "El correo debe de tener mínimo 5 letras").email("Ingresa un correo válido")
  })
  .required();

interface PageProps {
  onSuccess: () => void;
  userDataPage?: userDataInterface | null;
  onMessage?: () => void;

}

const Page = React.forwardRef<{ submit: () => void }, PageProps>(({ onSuccess, userDataPage, onMessage }, ref) => {

  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { showMessage } = useAlert()

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
      name: userDataPage?.name || "",
      email: userDataPage?.email || "",
      role: userDataPage?.role || "",
      status: userDataPage?.state.toString() === "1" ? "Activo" : userDataPage?.state.toString() === "0" ? "Inactivo" : ""
    },
    enableReinitialize: true,
    validationSchema: userDataPage?.id ? SchemaHouseUpdate : SchemaHouseRegister,
    onSubmit: async (data) => {
      if (userDataPage?.id) {
        await updateUser(data, userDataPage.id)
        onSuccess();
        formik.resetForm();
        showMessage("Actualización éxitosa", 'success')
      } else {
        const response = await register(data);
        if (response.statusText === "Created" || response.status === 200) {
          onSuccess();
          formik.resetForm();
          showMessage("Registro éxitoso", 'success')
        } else {
          console.log("Error during registration");
        }
      }
    },
  });

  React.useImperativeHandle(ref, () => ({
    submit: () => formik.handleSubmit(),
  }));

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Nombre'
            placeholder='Ingrese su nombre'
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            fullWidth
            label='Correo'
            placeholder='Ingrese un correo'
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </Grid>
        {!userDataPage?.id && (
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label='Contraseña'
              placeholder='Ingrese una contraseña'
              id='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={isPasswordShown ? 'text' : 'password'}
              helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setIsPasswordShown(!isPasswordShown)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}

        {!userDataPage?.id && (
          <Grid item xs={12} md={6}>
            <CustomTextField
              fullWidth
              label='Confirmar Contraseña'
              placeholder='Ingrese de nuevo la contraseña'
              id='passwordConfirm'
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={isPasswordConfirmShown ? 'text' : 'password'}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm ? formik.errors.passwordConfirm : ''}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setIsPasswordConfirmShown(!isPasswordConfirmShown)}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <i className={isPasswordConfirmShown ? 'tabler-eye-off' : 'tabler-eye'} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Rol'
            id='role'
            defaultValue=''
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.role && formik.errors.role ? formik.errors.role : ''}
            error={formik.touched.role && Boolean(formik.errors.role)}
          >
            {userData.userData.Datos.Rol.map((tipo: string, index: number) => (
              <MenuItem key={index} value={tipo}> {tipo} </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            select
            fullWidth
            label='Estado'
            id='status'
            defaultValue=''
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.touched.status && formik.errors.status ? formik.errors.status : ''}
            error={formik.touched.status && Boolean(formik.errors.status)}
          >
            {userData.userData.Datos.Estado.map((estado: string, index: number) => (
              <MenuItem key={index} value={estado}> {estado} </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
      </Grid>
    </form>
  );
});

export default Page;
