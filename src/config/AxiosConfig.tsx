import axios from "axios";

const axiosInstane = axios.create({
    baseURL: 'http://localhost:3000',
})

axiosInstane.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
})

export default axiosInstane;