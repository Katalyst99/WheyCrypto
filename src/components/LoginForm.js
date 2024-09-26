// frontend/src/components/LoginForm.js
import React, { useState } from 'react';
import { login, setAuthToken } from '../services/authService';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = await login(formData); // formData contains the email and password
          console.log('Response from backend:', data); // Check the full response from backend
      
          if (data && data.token) {
            console.log('Token received:', data.token); // Log token
            // You can store the token in localStorage/sessionStorage for further usage
            localStorage.setItem('token', data.token);
            setError(null); // Clear any previous errors
          } else {
            throw new Error('Login failed - No token received');
          }
        } catch (err) {
          console.error('Login error:', err);
          setError(err.response?.data?.message || 'Login failed');
        }
      };      

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;

