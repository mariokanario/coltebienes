'use client'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'


// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

type AddEditAddressData = {
  firstName?: string
  lastName?: string
  country?: string
  address1?: string
  address2?: string
  landmark?: string
  city?: string
  state?: string
  zipCode?: string
}

type AddEditAddressProps = {
  open: boolean
  setOpen: (open: boolean) => void
  data?: AddEditAddressData
}

const countries = ['Select Country', 'France', 'Russia', 'China', 'UK', 'US']



const AddEditAddress = ({ open, setOpen, data }: AddEditAddressProps) => {


  return (
    <Dialog
      open={open}
      maxWidth='md'
      scroll='body'
      onClose={() => {
        setOpen(false)
      }}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <DialogTitle variant='h4' className='flex gap-2 flex-col text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
        {data ? 'Edit Address' : 'Add New Address'}
        <Typography component='span' className='flex flex-col text-center'>
          {data ? 'Edit Address for future billing' : 'Add address for billing address'}
        </Typography>
      </DialogTitle>
      <form onSubmit={e => e.preventDefault()}>
        <DialogContent className='pbs-0 sm:pli-16'>
          <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
            <i className='tabler-x' />
          </DialogCloseButton>
          <Grid container spacing={6}>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='First Name'
                name='firstName'
                variant='outlined'
                placeholder='John'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Last Name'
                name='lastName'
                variant='outlined'
                placeholder='Doe'
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                select
                fullWidth
                label='Country'
                name='country'
                variant='outlined'
              >
                {countries.map((item, index) => (
                  <MenuItem key={index} value={index === 0 ? '' : item.toLowerCase().replace(/\s+/g, '-')}>
                    {item}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Address Line 1'
                name='address1'
                variant='outlined'
                placeholder='12, Business Park'
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Address Line 2'
                name='address1'
                variant='outlined'
                placeholder='Mall Road'
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
          <Button variant='contained' onClick={() => setOpen(false)} type='submit'>
            {data ? 'Update' : 'Submit'}
          </Button>
          <Button
            variant='tonal'
            color='secondary'
            onClick={() => {
              setOpen(false)
            }}
            type='reset'
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddEditAddress
