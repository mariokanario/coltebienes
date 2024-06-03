'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProviderProps {
    globalType: string;
    setGlobalType: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ProviderProps | undefined>(undefined);

const Provider = ({ children }: { children: ReactNode }) => {
    const [globalType, setGlobalType] = useState<string>('comercio');

    return (
        <Context.Provider value={{ globalType, setGlobalType }}>
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


