
// React Imports
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';



// MUI Imports
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import type { ButtonProps } from '@mui/material/Button'


// Component Imports
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import AddEditAddress from '@components/dialogs/address'



// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import MapView from './MapView';

type Props = {
    open: boolean
    handleClose: () => void
}

interface InputValues {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
    input7: string;
    input8: string;
    input9: string;
    input10: string;
}

const ModalAddress = ({ open, handleClose }: Props) => {

    const [combinedAddress, setCombinedAddress] = useState<string>('');
    const [viewMap, setViewMap] = useState<boolean>(false)

    const [address, setAddress] = useState<InputValues>({
        input1: ' ',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        input7: '',
        input8: '',
        input9: '',
        input10: ''
    });

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const coordinates = ['Este', 'Norte', 'Oeste', 'Sur']

    const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    useEffect(() => {
        const newCombinedString = Object.values(address).join(' ');

        setCombinedAddress(newCombinedString);

        // formik.setValues({ ...formik.values, addressbuild: newCombinedString }, false);
    }, [address]);


    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title' maxWidth={'md'}
            fullWidth={true}>
            <DialogContent>
                <DialogContentText className='mbe-3'>
                    <form>
                        <Grid container spacing={12}>

                            <Grid item xs={12} md={12}>
                                <CustomTextField
                                    fullWidth
                                    label='Dirección'
                                    placeholder='La dirección se completará una vez diligencie los campos de este formulario'
                                    inputProps={{ readOnly: true }}
                                    id="addressbuild"
                                    value={combinedAddress}
                                />
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Tipo de vía'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input1'
                                    onChange={handleAddress}

                                >
                                    <MenuItem value=''>Seleccione vía</MenuItem>
                                    <MenuItem value='Calle'>Calle</MenuItem>
                                    <MenuItem value='Carrera'>Carrera</MenuItem>
                                    <MenuItem value='Circular'>Circular</MenuItem>
                                    <MenuItem value='Cincunvalar'>Cincunvalar</MenuItem>
                                    <MenuItem value='Diagonal'>Diagonal</MenuItem>
                                    <MenuItem value='Transversal'>Transversal</MenuItem>
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    name='input2'
                                    onChange={handleAddress} />

                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    defaultValue=''
                                    name='input3'
                                    onChange={handleAddress}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {
                                        alphabet.map((a: string) =>
                                            <MenuItem key={a} value={a}>{a}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input4'
                                    onChange={handleAddress}
                                >

                                    <MenuItem value=''></MenuItem>
                                    {
                                        alphabet.map((a: string) =>
                                            <MenuItem key={a} value={a}>{a}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Sentido'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input5'
                                    onChange={handleAddress}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {
                                        coordinates.map((c: string) =>
                                            <MenuItem key={c} value={c}>{c}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    name='input6'
                                    onChange={handleAddress}
                                />
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input7'
                                    onChange={handleAddress}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {
                                        alphabet.map((a: string) =>
                                            <MenuItem key={a} value={a}>{a}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={2} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Letra'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input8'
                                    onChange={handleAddress}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {
                                        alphabet.map((a: string) =>
                                            <MenuItem key={a} value={a}>{a}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    select
                                    fullWidth
                                    label='Sentido'
                                    aria-describedby='country-select'
                                    defaultValue=''
                                    name='input9'
                                    onChange={handleAddress}
                                >
                                    <MenuItem value=''></MenuItem>
                                    {
                                        coordinates.map((c: string) =>
                                            <MenuItem key={c} value={c}>{c}</MenuItem>
                                        )
                                    }
                                </CustomTextField>
                            </Grid>

                            <Grid item xs={6} md={3} style={{ paddingTop: '1.5rem' }}>
                                <CustomTextField
                                    fullWidth
                                    type='number'
                                    label='Número'
                                    InputProps={{ inputProps: { min: 0 } }}
                                    name='input10'
                                    onChange={handleAddress}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} style={{ paddingTop: '1.5rem' }}>
                                <Button variant='contained' onClick={() => setViewMap(!viewMap)} startIcon={<i className='tabler-map-pin' />}>Ubicar mapa</Button>
                            </Grid>

                            {viewMap ?
                                <Grid item xs={12} md={12} style={{ paddingTop: '1.5rem' }}>
                                    <MapView />
                                </Grid>
                                : null
                            }



                        </Grid>
                    </form>


                </DialogContentText>
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleClose} variant='contained' >Agregar</Button>
            </DialogActions>
        </Dialog >
    )
}

export default ModalAddress
