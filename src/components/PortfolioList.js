import React, { useEffect, useState } from 'react';
import { getPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from '../services/portfolioService';

const PortfolioList = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [cryptoId, setCryptoId] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const fetchPortfolio = async () => {
            const data = await getPortfolio();
            setPortfolio(data);
        };
        fetchPortfolio();
    }, []);

    const handleAdd = async () => {
        await addPortfolio({ crypto_id: cryptoId, amount });
        const data = await getPortfolio();
        setPortfolio(data);
    };

    const handleUpdate = async (portfolio_id) => {
        await updatePortfolio({ portfolio_id, amount });
        const data = await getPortfolio();
        setPortfolio(data);
    };

    const handleDelete = async (portfolio_id) => {
        await deletePortfolio(portfolio_id);
        const data = await getPortfolio();
        setPortfolio(data);
    };

    return (
        <div>
            <h2>Portfolio</h2>
            <ul>
                {portfolio.map(item => (
                    <li key={item.portfolio_id}>
                        {item.name} - {item.amount}
                        <button onClick={() => handleUpdate(item.portfolio_id)}>Update</button>
                        <button onClick={() => handleDelete(item.portfolio_id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Crypto ID"
                value={cryptoId}
                onChange={(e) => setCryptoId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAdd}>Add to Portfolio</button>
        </div>
    );
};

export default PortfolioList;
