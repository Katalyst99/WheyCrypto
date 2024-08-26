const db = require('../config/db');

const Portfolio = {
    create: (user_id, crypto_id, amount) => {
        return db.execute(
            'INSERT INTO portfolio (user_id, crypto_id, amount) VALUES (?, ?, ?)',
            [user_id, crypto_id, amount]
        );
    },
    findByUserId: (user_id) => {
        return db.execute(
            'SELECT * FROM portfolio WHERE user_id = ?',
            [user_id]
        );
    },
    update: (portfolio_id, amount) => {
        return db.execute(
            'UPDATE portfolio SET amount = ? WHERE portfolio_id = ?',
            [amount, portfolio_id]
        );
    },
    delete: (portfolio_id) => {
        return db.execute(
            'DELETE FROM portfolio WHERE portfolio_id = ?',
            [portfolio_id]
        );
    },
};

module.exports = Portfolio;
