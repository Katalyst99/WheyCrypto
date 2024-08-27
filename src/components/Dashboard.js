import React from 'react';
import CryptoList from './CryptoList';  // Import the CryptoList component
import PortfolioList from './PortfolioList';  // Import the PortfolioList component

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to WheyCrypto Dashboard</h1>
            <CryptoList /> {/* Add the CryptoList component here */}
            <PortfolioList /> {/* Add the PortfolioList component here */}
        </div>
    );
};

export default Dashboard;
