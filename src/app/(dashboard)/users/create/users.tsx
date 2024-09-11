import React, { useState, useEffect, useRef } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Snackbar, Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import users from '../list/users';
import state from '@/app/api/login/state';
import deleteUser from '@/app/api/login/delete';
import SimpleModal from './modalRegister';
import { useAlert } from '@/components/AlertContext';


export interface userDataInterface {
    id: number,
    name: string,
    email: string,
    role: string,
    state: number
}

export default function ListUsers() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const formRef = useRef<{ submit: () => void }>(null);
    const [editUserData, setEditUserData] = useState<userDataInterface | null>(null);
    const [modalMode, setModalMode] = useState<'register' | 'update'>('register');
    const { showMessage } = useAlert()


    const handleClick = () => {
        setOpen(true);
    };

    const handleEdit = (user: userDataInterface) => {
        setEditUserData(user);
        setModalMode('update');
        setModalOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleRegisterSuccess = () => {
        getUsers();
    };

    const handleSendMessage = (message: string, type: any) => {
        showMessage(message, type)
    }

    const handleDelete = async () => {
        if (userToDelete !== null) {
            try {
                const response = await deleteUser(userToDelete);
                getUsers();
                handleClick();
                setMessage(response.data.message);
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            } finally {
                setConfirmDeleteOpen(false);
                setUserToDelete(null);
            }
        }
    };

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nombre', flex: 1 },
        { field: 'email', headerName: 'Correo', flex: 1 },
        { field: 'role', headerName: 'Rol', flex: 1 },
        {
            field: 'state',
            headerName: 'Estado',
            flex: 1,
            renderCell: (params) => {
                const handleStateChange = async () => {
                    const response = await state(params.row.id);
                    getUsers();
                    handleClick();
                    setMessage(response.data.message);
                };

                const rowCount = params.api.getRowModels().size;

                if (rowCount <= 1) {
                    return null;
                }


                return (
                    <Button
                        variant="contained"
                        color={params.value === 1 ? 'success' : 'error'}
                        onClick={handleStateChange}
                    >
                        {params.value === 1 ? 'Activo' : 'Inactivo'}
                    </Button>
                );

            },
        },
        {
            field: 'action',
            headerName: 'Acciones',
            flex: 1,
            renderCell: (params) => {
                const handleOpenConfirmDelete = () => {
                    setUserToDelete(params.row.id);
                    setConfirmDeleteOpen(true);
                };

                return (
                    <>
                        {rows.length > 1 && (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEdit(params.row)}
                                    style={{ marginRight: '8px' }}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleOpenConfirmDelete}
                                >
                                    Eliminar
                                </Button>
                            </div>
                        )}

                    </>
                );
            },
        },
    ];

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await users();
            const data: userDataInterface[] = response.data;
            const formattedData = data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                state: user.state
            }));
            setRows(formattedData);
        } catch (error) {
            setError('Error fetching data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div style={{ height: 300, width: '100%' }}>
            <Box paddingBottom={'30px'}>
                <Button variant="contained" color="primary" onClick={() => {
                    setEditUserData(null);
                    setModalMode('register');
                    setModalOpen(true);
                }}>
                    Agregar usuario
                </Button>
            </Box>

            {loading ? (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="25vh"
                >
                    <CircularProgress size={64} color="inherit" />
                </Box>
            ) : error ? (
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="error">
                        {"Error al cargar los usuarios, vuelva e intente"}
                    </Alert>
                </Snackbar>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25]}
                    sx={{
                        height: 600,
                        width: '100%',
                    }}
                />
            )}

            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Box sx={{ marginTop: '55px' }}>
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                </Box>
            </Snackbar>

            <Dialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
            >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                    ¿Estás seguro de que deseas eliminar este usuario?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>

            <SimpleModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onRegisterSuccess={handleRegisterSuccess}
                userDataPage={editUserData}
                ref={formRef}
                mode={modalMode}
                onMessage={handleSendMessage}
            />
        </div>
    );
}
