import { useState } from "react"
import axiosInstane from "../config/AxiosConfig";

const useAuth = () => {
    const [auth, setAuth] = useState<boolean>(!!localStorage.getItem('accessToken'));

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstane.post('/login', {email, password});
            localStorage.setItem('accessToken', response.data.accessToken);
            setAuth(true);
        } catch (error) {
            console.error('login fail', error);
            throw error;            
        }
    }

    const logOut = () => {
        localStorage.re
    }
}