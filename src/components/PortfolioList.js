import React, { useEffect, useState } from 'react';
import { getPortfolio, addPortfolio, updatePortfolio, deletePortfolio } from '../services/portfolioService';

const PortfolioList = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [cryptoId, setCryptoId] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getPortfolio();
            setPortfolio(data);
        } catch (err) {
            setError('Failed to fetch portfolio. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!cryptoId || !amount) {
            setError('Please enter both Crypto ID and Amount');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            await addPortfolio({ crypto_id: cryptoId, amount });
            await fetchPortfolio();
            setCryptoId('');
            setAmount('');
        } catch (err) {
            setError('Failed to add to portfolio. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (portfolio_id, newAmount) => {
        setIsLoading(true);
        setError(null);
        try {
            await updatePortfolio({ portfolio_id, amount: newAmount });
            await fetchPortfolio();
        } catch (err) {
            setError('Failed to update portfolio. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (portfolio_id) => {
        setIsLoading(true);
        setError(null);
        try {
            await deletePortfolio(portfolio_id);
            await fetchPortfolio();
        } catch (err) {
            setError('Failed to delete from portfolio. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Portfolio</h2>
            {error && <p className="error">{error}</p>}
            <ul>
                {portfolio.map(item => (
                    <li key={item.portfolio_id}>
                        {item.name} - {item.amount}
                        <input
                            type="text"
                            placeholder="New Amount"
                            onChange={(e) => item.newAmount = e.target.value}
                        />
                        <button onClick={() => handleUpdate(item.portfolio_id, item.newAmount)}>Update</button>
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
            <button onClick={handleAdd} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add to Portfolio'}
            </button>
        </div>
    );
};

export default PortfolioList;
