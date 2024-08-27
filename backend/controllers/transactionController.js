const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const { crypto_id, amount, transaction_type, price_at_transaction } = req.body;
        const user_id = req.user.user_id;
        await Transaction.create(user_id, crypto_id, amount, transaction_type, price_at_transaction);
        res.status(201).json({ message: 'Transaction created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const [rows] = await Transaction.findByUserId(user_id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { transaction_id, amount, transaction_type, price_at_transaction } = req.body;
        await Transaction.update(transaction_id, amount, transaction_type, price_at_transaction);
        res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.body;
        await Transaction.delete(transaction_id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
