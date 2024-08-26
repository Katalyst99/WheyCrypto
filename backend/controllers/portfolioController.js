const Portfolio = require('../models/Portfolio');

exports.createPortfolio = async (req, res) => {
    try {
        const { crypto_id, amount } = req.body;
        const user_id = req.user.user_id;
        await Portfolio.create(user_id, crypto_id, amount);
        res.status(201).json({ message: 'Portfolio entry created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPortfolio = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const [rows] = await Portfolio.findByUserId(user_id);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePortfolio = async (req, res) => {
    try {
        const { portfolio_id, amount } = req.body;
        await Portfolio.update(portfolio_id, amount);
        res.status(200).json({ message: 'Portfolio updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePortfolio = async (req, res) => {
    try {
        const { portfolio_id } = req.body;
        await Portfolio.delete(portfolio_id);
        res.status(200).json({ message: 'Portfolio entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
