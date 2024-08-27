import React, { useEffect, useState } from 'react';
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/transactionService';

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [cryptoId, setCryptoId] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [priceAtTransaction, setPriceAtTransaction] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await getTransactions();
            setTransactions(data);
        };
        fetchTransactions();
    }, []);

    const handleAdd = async () => {
        await addTransaction({ crypto_id: cryptoId, amount, transaction_type: transactionType, price_at_transaction: priceAtTransaction });
        const data = await getTransactions();
        setTransactions(data);
    };

    const handleUpdate = async (transaction_id) => {
        await updateTransaction({ transaction_id, amount, transaction_type: transactionType, price_at_transaction: priceAtTransaction });
        const data = await getTransactions();
        setTransactions(data);
    };

    const handleDelete = async (transaction_id) => {
        await deleteTransaction(transaction_id);
        const data = await getTransactions();
        setTransactions(data);
    };

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map(item => (
                    <li key={item.transaction_id}>
                        {item.transaction_type} {item.amount} of {item.crypto_id} at ${item.price_at_transaction} on {new Date(item.created_at).toLocaleString()}
                        <button onClick={() => handleUpdate(item.transaction_id)}>Update</button>
                        <button onClick={() => handleDelete(item.transaction_id)}>Delete</button>
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
            <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
            </select>
            <input
                type="text"
                placeholder="Price at Transaction"
                value={priceAtTransaction}
                onChange={(e) => setPriceAtTransaction(e.target.value)}
            />
            <button onClick={handleAdd}>Add Transaction</button>
        </div>
    );
};

export default TransactionHistory;
