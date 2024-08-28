import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = 'http://localhost:5000/api';

export const getTrendingCryptocurrencies = async () => {
    const response = await axios.get(`${API_URL}/trending`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};
