const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
// app.use(cors({
    // origin: ['http://localhost:3000', 'http://127.0.0.1:5000', 'http://localhost:5000', 'http://127.0.0.1:3000'], // Allowed origins
    // credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// }));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204); // No content
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
