import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

// Auth provider
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check localStorage/sessionStorage on load
    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('user'));
        if (storedUser) setUser(storedUser);
    }, []);

    // Signup function
    const signup = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
                        sessionStorage.setItem('user', JSON.stringify(res.data.user));

            return res.data;
        } catch (err) {
            throw err.response?.data || { message: 'Signup failed' };
        }
    };

    // Login function (if needed later)
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(res.data.user);
            sessionStorage.setItem('user', JSON.stringify(res.data.user));
            return res.data;
        } catch (err) {
            throw err.response?.data || { message: 'Login failed' };
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
