import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister } from '../services/authService';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            await authLogin(email, password);
            navigate('/dashboard');
            return true;
        } catch (err) {
            setError(err.message || 'Failed to login');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (firstName, lastName, email, password) => {
        setLoading(true);
        setError('');
        try {
            await authRegister(firstName, lastName, email, password);
            navigate('/login');
            return true;
        } catch (err) {
            setError(err.message || 'Failed to register');
            return false;
        } finally {
            setLoading(false);
        }
    };



    const logout = () => {
        localStorage.removeItem("user");
        navigate('/login');
    };

    const user = JSON.parse(localStorage.getItem("user"));

    return {
        login,
        register,
        logout,
        user,
        loading,
        error,
        setError
    };
};
