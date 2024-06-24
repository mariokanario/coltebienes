// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { PropertiesType } from '@/types/apps/propertyTypes'

// Component Imports
import PropertyListTable from './ProperyListTable'

const PropertyList = ({ propertyData }: { propertyData?: PropertiesType[] }) => {
  return (
    <Grid container spacing={6}>

      <Grid item xs={12}>
        <PropertyListTable tableData={propertyData} />
      </Grid>
    </Grid>
  )
}

export default PropertyList
