// React Imports
"use client";
import { useEffect, useState } from 'react';

// MUI Imports
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Component Imports
import DirectionalIcon from '@components/DirectionalIcon';
import Users from './users';
import SimpleModal from './modalRegister';
import { useHandleRefreshToken } from '@/components/context/RefreshContext';


const Page = () => {

  const { handleRefreshToken } = useHandleRefreshToken();
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);


  useEffect(() => {
    handleRefreshToken()
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <div className='flex items-center justify-between'>

        </div>
      </Grid>
      <Grid item xs={12} md={12}>
        <Users />

      </Grid>
    </Grid>
  )
}

export default Page
