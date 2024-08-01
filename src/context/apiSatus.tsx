import { Children, createContext, ReactNode, useContext, useState } from "react";

interface ApiStatus {
    loading: boolean;
    error: string | null;
    success: string | null;
    messages: string | null;
    setMessages: (message: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: string | null) => void;
}

const ApiStatusContext = createContext<ApiStatus | undefined>(undefined)

export const ApiStatusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [messages, setMessages] = useState<string | null>(null);

    return (
        <ApiStatusContext.Provider value={{ loading, messages, error, success, setMessages, setError, setLoading, setSuccess }}>
            {children}
        </ApiStatusContext.Provider>
    )
}
export const useStatus = (): ApiStatus => {
    const context = useContext(ApiStatusContext);
    if (!context) {
        throw new Error('UseLoading Phai Trong LoadingProvider')
    }
    return context;
}
