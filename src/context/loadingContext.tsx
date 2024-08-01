import { createContext, ReactNode, useContext, useState } from "react";

interface LoadingContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [loading, setLoading] = useState<boolean>(false);

    return(
        <LoadingContext.Provider value={{loading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if(!context){
        throw new Error('UseLoading Phai Trong LoadingProvider')
    }
    return context;
}