const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { getCryptoPrices } = require('./services/cryptoService'); // Assume this service fetches latest prices

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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
