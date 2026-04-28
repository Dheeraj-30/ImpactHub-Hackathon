import React, { useState } from 'react';

const Navbar = ({ onOpenModal, onOpenConnect, onLogout, setCurrentPage, currentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
            <span className="text-2xl mr-2">🌍</span>
            <h1 className="text-xl font-black tracking-tight text-gray-900">
              Impact<span className="text-red-600">Hub</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => setCurrentPage('dashboard')} className={`font-semibold text-sm ${currentPage === 'dashboard' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</button>
            <button onClick={() => setCurrentPage('myimpact')} className={`font-semibold text-sm ${currentPage === 'myimpact' ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'}`}>My Impact</button>
            
            <div className="h-6 w-px bg-gray-300 mx-2"></div>

            <button onClick={onOpenConnect} className="bg-gray-100 text-gray-900 text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              🤝 Connect Nearby
            </button>
            <button onClick={onOpenModal} className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-md shadow-red-600/20">
              🚨 Raise Alert
            </button>
            <button onClick={onLogout} className="text-gray-500 hover:text-gray-800 font-medium text-sm ml-2">
              Logout
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <button onClick={() => { setCurrentPage('dashboard'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-gray-700 py-2">Dashboard</button>
          <button onClick={() => { setCurrentPage('myimpact'); setIsMobileMenuOpen(false); }} className="block w-full text-left font-semibold text-gray-700 py-2">My Impact</button>
          <button onClick={() => { onOpenConnect(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-gray-900 bg-gray-100 font-bold px-4 py-2 rounded-lg">🤝 Connect Nearby</button>
          <button onClick={() => { onOpenModal(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-white bg-red-600 font-bold px-4 py-2 rounded-lg shadow-md">🚨 Raise Alert</button>
          <button onClick={onLogout} className="block w-full text-left text-gray-500 font-medium py-2">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;