import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = 'http://localhost:5000/api';

export const getPortfolio = async () => {
    const response = await axios.get(`${API_URL}/portfolio`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const addPortfolio = async (portfolioData) => {
    const response = await axios.post(`${API_URL}/portfolio`, portfolioData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const updatePortfolio = async (portfolioData) => {
    const response = await axios.put(`${API_URL}/portfolio`, portfolioData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const deletePortfolio = async (portfolio_id) => {
    const response = await axios.delete(`${API_URL}/portfolio`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: { portfolio_id }
    });
    return response.data;
};
