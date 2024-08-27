const db = require('../config/db');

const Transaction = {
    create: (user_id, crypto_id, amount, transaction_type, price_at_transaction) => {
        return db.execute(
            'INSERT INTO transactions (user_id, crypto_id, amount, transaction_type, price_at_transaction) VALUES (?, ?, ?, ?, ?)',
            [user_id, crypto_id, amount, transaction_type, price_at_transaction]
        );
    },
    findByUserId: (user_id) => {
        return db.execute(
            'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC',
            [user_id]
        );
    },
    update: (transaction_id, amount, transaction_type, price_at_transaction) => {
        return db.execute(
            'UPDATE transactions SET amount = ?, transaction_type = ?, price_at_transaction = ? WHERE transaction_id = ?',
            [amount, transaction_type, price_at_transaction, transaction_id]
        );
    },
    delete: (transaction_id) => {
        return db.execute(
            'DELETE FROM transactions WHERE transaction_id = ?',
            [transaction_id]
        );
    },
};

module.exports = Transaction;

