import React from 'react';
import CryptoList from './CryptoList';
import PortfolioList from './PortfolioList';
import TransactionHistory from './TransactionHistory';  // Import the TransactionHistory component

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to WheyCrypto Dashboard</h1>
            <CryptoList />
            <PortfolioList />
            <TransactionHistory />  {/* Add the TransactionHistory component here */}
        </div>
    );
};

export default Dashboard;
