import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MyImpact from './components/MyImpact'; // 1. Import your new page!
import Auth from './components/Auth'; 
import IssueModal from './components/IssueModal';
import ConnectNearbyModal from './components/ConnectNearbyModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshKey, setRefreshKey] = useState(0); 
  
  const [currentPage, setCurrentPage] = useState('dashboard'); 

 
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return (
      <div className="w-full min-h-screen bg-surface-container-low flex flex-col">
        <Auth setToken={setToken} /> 
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      
      <Navbar 
        onOpenModal={() => setIsModalOpen(true)} 
        onOpenConnect={() => setIsConnectOpen(true)}
        onLogout={handleLogout} 
        setCurrentPage={setCurrentPage} 
        currentPage={currentPage}
      />
      
      <main className="w-full px-4 md:px-8 py-6">
        
        {currentPage === 'dashboard' ? (
          <Dashboard refreshKey={refreshKey} />
        ) : (
          <MyImpact />
        )}
      </main>

      <IssueModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => setRefreshKey(oldKey => oldKey + 1)} 
      />

      
      <ConnectNearbyModal 
        isOpen={isConnectOpen} 
        onClose={() => setIsConnectOpen(false)} 
      />
    </div>
  );
}

export default App;