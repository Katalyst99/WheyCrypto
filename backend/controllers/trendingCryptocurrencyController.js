const TrendingCryptocurrency = require('../models/TrendingCryptocurrency');

exports.getTrendingCryptocurrencies = async (req, res) => {
    try {
        const [rows] = await TrendingCryptocurrency.findAll();
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
