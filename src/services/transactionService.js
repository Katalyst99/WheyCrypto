import axios from 'axios';
import { getAuthToken } from './authService';

const API_URL = 'http://localhost:5000/api';

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const addTransaction = async (transactionData) => {
    const response = await axios.post(`${API_URL}/transactions`, transactionData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const updateTransaction = async (transactionData) => {
    const response = await axios.put(`${API_URL}/transactions`, transactionData, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
    });
    return response.data;
};

export const deleteTransaction = async (transaction_id) => {
    const response = await axios.delete(`${API_URL}/transactions`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        data: { transaction_id }
    });
    return response.data;
};
