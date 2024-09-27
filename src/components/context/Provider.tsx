'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface userProvider {
    id: number
    name: string
    cedula: string
    email: string
    role: string
}

interface ProviderProps {
    globalType: string
    setGlobalType: React.Dispatch<React.SetStateAction<string>>
    globalUser: userProvider
    setGlobalUser: React.Dispatch<React.SetStateAction<userProvider>>
    clearUser: boolean
    setClearUser: React.Dispatch<React.SetStateAction<boolean>>
}

export const Context = createContext<ProviderProps | undefined>(undefined);

const Provider = ({ children }: { children: ReactNode }) => {
    const initialUser: userProvider = {
        id: 0,
        name: '',
        cedula: '',
        email: '',
        role: ''
    }

    const [globalType, setGlobalType] = useState<string>('comercio')
    const [globalUser, setGlobalUser] = useState<userProvider>(initialUser)
    const [clearUser, setClearUser] = useState(false)

    useEffect(() => {
        if (clearUser) {
            setGlobalUser(initialUser)
            setClearUser(false)
        }
    }, [clearUser])

    return (
        <Context.Provider value={{ globalType, setGlobalType, globalUser, setGlobalUser, clearUser, setClearUser }}>
            {children}
        </Context.Provider>
    );
};

export const useProvider = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useProvider debe ser usado dentro de un Provider');
    }

    return context;
};

export default Provider;
