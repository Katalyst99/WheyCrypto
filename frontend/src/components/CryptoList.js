import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../services/coinGeckoService';

const CryptoList = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCryptoData = async () => {
            try {
                const data = await fetchCryptoData();
                setCryptoData(data);
            } catch (error) {
                console.error('Error loading crypto data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCryptoData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Top Cryptocurrencies</h2>
            <ul>
                {cryptoData.map((crypto) => (
                    <li key={crypto.id}>
                        {crypto.name} ({crypto.symbol.toUpperCase()}): ${crypto.current_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CryptoList;

