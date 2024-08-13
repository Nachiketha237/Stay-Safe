import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (userLogin) => {
        setLoading(true);
        setError(null);

        try {
            const { data, status } = await AuthService.login(
                userLogin.email,
                userLogin.password
            );

            if (status === 200) {
                localStorage.setItem('accessToken', data.access_token);
                localStorage.setItem('refreshToken', data.refresh_token);
                navigate('/');
            } else if (status === 400) {
                setError("Invalid email or password");
            } else {
                setError("An unknown error occurred");
            }
        } catch (err) {
            setError("Failed to login. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        login
    };
};

export default useLogin;
