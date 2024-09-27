import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { formDataInterface } from '@/components/context/FormDataInterface'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { Button } from '@mui/material'

const TableFilters = ({ setData, tableData }: { setData: any; tableData?: formDataInterface[] }) => {
  const [type, setType] = useState<string>('')
  const [charge, setCharge] = useState<string>('')
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {

      if (charge && user.charge !== charge) {
        return false
      }

      if (type && user.globaltype !== type) {
        return false
      }
      //if (status && user.status !== status) return false; // Filtra por 'status'

      return true;
    });

    setData(filteredData);

  }, [charge, type, status, tableData, setData])



  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-type'
            value={type}
            label="Seleccione Tipo"
            onChange={e => setType(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Tipo</MenuItem>
            <MenuItem value='vivienda'>Vivienda</MenuItem>
            <MenuItem value='comercio'>Comercio</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-charge'
            value={charge}
            label="Seleccione Tipo de gestión"
            onChange={e => setCharge(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Tipo de gestión</MenuItem>
            <MenuItem value='Arriendo'>Arriendo</MenuItem>
            <MenuItem value='Venta'>Venta</MenuItem>
            <MenuItem value='Arriendo/Venta'>Arriendo/Venta</MenuItem>
          </CustomTextField>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            label="Seleccione Estado"
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Estado</MenuItem>
            <MenuItem value='inactivo'>Inactivo</MenuItem>
            <MenuItem value='publicado'>Publicado</MenuItem>
          </CustomTextField>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <Button
            sx={{
              position: 'relative',
              top: '18px'
            }}
            onClick={() => {
              setStatus('')
              setCharge('')
              setType('')
            }}
            variant='contained'
            className='sm:is-auto'
          >
            Limpiar filtros
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
