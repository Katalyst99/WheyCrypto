const express = require('express');
const authRoutes = require('./auth');
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use('/auth', authRoutes);

// Portfolio routes
router.post('/portfolio', authMiddleware, portfolioController.createPortfolio);
router.get('/portfolio', authMiddleware, portfolioController.getPortfolio);
router.put('/portfolio', authMiddleware, portfolioController.updatePortfolio);
router.delete('/portfolio', authMiddleware, portfolioController.deletePortfolio);

module.exports = router;
