// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { PropertiesType } from '@/types/apps/propertyTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: any; tableData?: PropertiesType[] }) => {
  // States
  const [type, setType] = useState<PropertiesType['type']>('')
  const [charge, setCharge] = useState<PropertiesType['charge']>('')
  const [status, setStatus] = useState<PropertiesType['status']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (type && user.type !== type) return false
      if (charge && user.charge !== charge) return false
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData)
  }, [type, charge, status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-role'
            value={type}
            onChange={e => setType(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Tipo</MenuItem>
            <MenuItem value='casa'>Casa</MenuItem>
            <MenuItem value='local'>Local</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-plan'
            value={charge}
            onChange={e => setCharge(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Tipo de gestion</MenuItem>
            <MenuItem value='arriendo'>Arriendo</MenuItem>
            <MenuItem value='venta'>Venta</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Seleccione Estado</MenuItem>
            <MenuItem value='inactivo'>Inactivo</MenuItem>
            <MenuItem value='publicado'>Publicado</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
