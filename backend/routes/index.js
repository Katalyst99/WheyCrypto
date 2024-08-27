const express = require('express');
const authRoutes = require('./auth');
const portfolioController = require('../controllers/portfolioController');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);

// Portfolio routes
router.post('/portfolio', authMiddleware, portfolioController.createPortfolio);
router.get('/portfolio', authMiddleware, portfolioController.getPortfolio);
router.put('/portfolio', authMiddleware, portfolioController.updatePortfolio);
router.delete('/portfolio', authMiddleware, portfolioController.deletePortfolio);

// Transaction routes
router.post('/transactions', authMiddleware, transactionController.createTransaction);
router.get('/transactions', authMiddleware, transactionController.getTransactions);
router.put('/transactions', authMiddleware, transactionController.updateTransaction);
router.delete('/transactions', authMiddleware, transactionController.deleteTransaction);

module.exports = router;
