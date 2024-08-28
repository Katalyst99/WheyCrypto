const db = require('../config/db');

exports.getCryptoPrices = async () => {
    const [rows] = await db.query('SELECT * FROM cryptocurrencies');
    return rows;
};
