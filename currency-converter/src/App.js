import React, { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';  
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderTabContent = () => {
    switch(activeTab) {
      case 'blog':
        return <div className="page-content">Blog Content Coming Soon</div>;
      case 'settings':
        return <div className="page-content">Settings Panel</div>;
      case 'signup':
        return <SignUp />; 
      default:
        return <CurrencyConverter />;
    }
  };

  return (
    <div className="App">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </div>
  );
}

export default App;