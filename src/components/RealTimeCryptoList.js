import React, { useEffect, useState } from 'react';

const RealTimeCryptoList = () => {
    const [cryptos, setCryptos] = useState([]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5000');

        ws.onmessage = (event) => {
            const updatedCryptos = JSON.parse(event.data);
            setCryptos(updatedCryptos);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => ws.close();
    }, []);

    return (
        <div>
            <h2>Real-Time Cryptocurrency Prices</h2>
            <ul>
                {cryptos.map(crypto => (
                    <li key={crypto.crypto_id}>
                        {crypto.name} - ${crypto.current_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimeCryptoList;

