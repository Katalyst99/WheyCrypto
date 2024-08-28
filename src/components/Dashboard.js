import React from 'react';
import CryptoList from './CryptoList';
import PortfolioList from './PortfolioList';
import TransactionHistory from './TransactionHistory';  // Import the TransactionHistory component
import TrendingList from './TrendingList'; // Import the TrendingList component
import RealTimeCryptoList from './RealTimeCryptoList'; // Import the real-time component

const Dashboard = () => {
    return (
        <div>
            <h1>Welcome to WheyCrypto Dashboard</h1>
            <CryptoList />
	    <RealTimeCryptoList /> {/* Add the real-time component here */}
            <PortfolioList />
            <TransactionHistory />  {/* Add the TransactionHistory component here */}
	    <TrendingList /> {/* Add the TrendingList component here */}
        </div>
    );
};

export default Dashboard;
