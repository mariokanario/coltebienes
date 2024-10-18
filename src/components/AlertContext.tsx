"use client"
import { createContext, useContext, useState } from 'react';
import { AlertColor, Snackbar, Alert } from '@mui/material';

interface AlertContextType {
    message: string
    severity: AlertColor
    showMessage: (msg: string, severity: AlertColor) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<AlertColor>('success')
    const [open, setOpen] = useState(false)

    const showMessage = (msg: string, severity: AlertColor = 'success') => {
        setMessage(msg)
        setSeverity(severity)
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <AlertContext.Provider value={{ message, severity, showMessage }}>
            {children}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: '150%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>

    );
};

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider')
    }
    return context;
};
