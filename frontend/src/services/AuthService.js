import api from "./api";


const baseURL=import.meta.env.VITE_REACT_API_URL;


// const baseURL=  'http://localhost:8000/api';
// console.log("VITE_API_URL:", import.meta.env.VITE_REACT_API_URL);
// console.log("baseURL:", baseURL);

const AuthService = {
    register: async (username, email, password) => {
        try {
            console.log("baseURL:", baseURL);
            const response = await api.post(`${baseURL}/register/`, { username, email, password });

            if (response.status !== 201) {
                console.error('Registration failed with status:', response.status);
                throw new Error('Registration failed');
            }

            return { status: response.status, data: response.data };
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },

    login: async (email, password) => {
        
        try {
            console.log("baseURL:", baseURL);
            const response = await api.post(`${baseURL}/login/`, { email, password });

            if (response.data.accessToken) {
                localStorage.setItem("accessToken", response.data.accessToken);
            }

            return response;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("accessToken");
    }
};

export default AuthService;
