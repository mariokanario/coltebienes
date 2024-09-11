import React, { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Page from './register';
import { userDataInterface } from './users';

interface SimpleModalProps {
    open: boolean;
    onClose: () => void;
    onMessage: (message: string, type: any) => void;
    onRegisterSuccess: () => void;
    userDataPage?: userDataInterface | null;
    ref?: React.RefObject<{ submit: () => void }>;
    mode: 'register' | 'update';
}

const SimpleModal: React.FC<SimpleModalProps> = ({ open, onClose, onRegisterSuccess, userDataPage, ref, mode, onMessage }) => {
    const formRef = useRef<{ submit: () => void }>(null);

    const handleRegister = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{mode === 'register' ? 'Registro de usuarios' : 'Actualización de usuarios'}</DialogTitle>
            <DialogContent>
                <Page ref={formRef} userDataPage={userDataPage} onSuccess={() => {
                    onRegisterSuccess();
                    onClose();
                }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleRegister}>{mode === 'register' ? 'Registrar' : 'Actualizar'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SimpleModal;
