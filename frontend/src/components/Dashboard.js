// frontend/src/components/Dashboard.js
import React from 'react';
import CryptoList from './CryptoList';  // Import the CryptoList component

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to WheyCrypto Dashboard</h1>
            <CryptoList /> {/* Add the CryptoList component here */}
        </div>
    );
};

export default Dashboard;
