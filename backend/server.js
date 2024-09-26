const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const routes = require('./routes/index');
const { getCryptoPrices } = require('./services/cryptoService');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes for REST API
app.use('/api', routes);  // Prefix API routes with /api

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'))); // Corrected path

// Serve React App for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html')); // Corrected path
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send updates every 5 seconds
    const interval = setInterval(async () => {
        const prices = await getCryptoPrices(); // Fetch latest prices
        ws.send(JSON.stringify(prices)); // Send data to client
    }, 5000);

    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});

server.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
