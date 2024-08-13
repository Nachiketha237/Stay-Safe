import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const register = async (userCredentials) => {
        setLoading(true);
        setError(null);

        if (userCredentials.password.length < 8) {
            setError("Password should be at least 8 characters long");
            setLoading(false);
            return;
        }

        if (userCredentials.password !== userCredentials.passwordConfirmation) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { status, data } = await AuthService.register(
                userCredentials.username,
                userCredentials.email,
                userCredentials.password
            );

            if (status === 201) {
                navigate('/login');
            } else if (status === 400) {
                setError("User already exists");
            } else {
                setError("An unknown error occurred");
            }
        } catch (err) {
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        register
    };
};

export default useRegister;
