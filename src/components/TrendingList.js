import React, { useEffect, useState } from 'react';
import { getTrendingCryptocurrencies } from '../services/trendingService';

const TrendingList = () => {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        const fetchTrending = async () => {
            const data = await getTrendingCryptocurrencies();
            setTrending(data);
        };
        fetchTrending();
    }, []);

    return (
        <div>
            <h2>Trending Cryptocurrencies</h2>
            <ul>
                {trending.map((crypto, index) => (
                    <li key={index}>
                        {crypto.rank}. {crypto.name} ({crypto.symbol}) - Marked as trending on {new Date(crypto.created_at).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingList;
