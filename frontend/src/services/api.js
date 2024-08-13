import axios from "axios";
import { ACCESS_TOKEN } from "../utils/constants";


const api = axios.create({
    // baseURL: 'http://localhost:8000/api',
    baseURL: import.meta.env.VITE_REACT_API_URL,

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
