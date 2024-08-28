import React from 'react';
import CryptoList from './CryptoList';
import PortfolioList from './PortfolioList';
import TransactionHistory from './TransactionHistory';  // Import the TransactionHistory component
import TrendingList from './TrendingList'; // Import the TrendingList component

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to WheyCrypto Dashboard</h1>
            <CryptoList />
            <PortfolioList />
            <TransactionHistory />  {/* Add the TransactionHistory component here */}
	    <TrendingList /> {/* Add the TrendingList component here */}
        </div>
    );
};

export default Dashboard;
