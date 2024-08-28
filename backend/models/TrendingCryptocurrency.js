const db = require('../config/db');

const TrendingCryptocurrency = {
    findAll: () => {
        return db.execute(
            `SELECT c.name, c.symbol, t.rank, t.created_at 
            FROM trending_cryptocurrencies t 
            JOIN cryptocurrencies c ON t.crypto_id = c.crypto_id 
            ORDER BY t.rank ASC`
        );
    }
};

module.exports = TrendingCryptocurrency;
