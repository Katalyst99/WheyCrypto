import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (currency = 'usd', limit = 10) => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
            params: {
                vs_currency: currency,
                order: 'market_cap_desc',
                per_page: limit,
                page: 1,
                sparkline: false
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};
