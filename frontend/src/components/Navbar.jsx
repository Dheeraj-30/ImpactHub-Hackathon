import React, { useState } from "react";

const Navbar = ({
  onOpenModal,
  onOpenConnect,
  onLogout,
  setCurrentPage,
  currentPage,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="select-none flex items-center gap-8">
          <h1
            className="text-xl font-bold text-gray-900 tracking-tight cursor-pointer"
            onClick={() => handleNavClick("dashboard")}
          >
            ImpactHub
          </h1>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
            <span
              onClick={() => handleNavClick("dashboard")}
              className={`cursor-pointer transition-colors ${currentPage === "dashboard" ? "text-gray-900 border-b-2 border-gray-900 pb-1 font-bold" : "hover:text-gray-900"}`}
            >
              Dashboard
            </span>

            <span
              onClick={() => handleNavClick("my-impact")}
              className={`cursor-pointer transition-colors ${currentPage === "my-impact" ? "text-gray-900 border-b-2 border-gray-900 pb-1 font-bold" : "hover:text-gray-900"}`}
            >
              My Impact
            </span>

            <div className="relative group flex items-center justify-center">
              <span className="hover:text-gray-900 cursor-pointer transition-colors pb-1">
                Partners
              </span>

              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-800 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg z-50">
                v2 Roadmap: NGO & Corporate Partner Directory
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>

            <div className="relative group flex items-center justify-center">
              <span className="hover:text-gray-900 cursor-pointer transition-colors pb-1">
                Resources
              </span>

              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-800 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg z-50">
                v2 Roadmap: Emergency Response Knowledge Base
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="select-none flex items-center gap-5">
          <button
            onClick={onOpenModal}
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition shadow-sm"
          >
            📢 Raise an Issue
          </button>

          <button
            onClick={onOpenConnect}
            className="bg-gray-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm hidden sm:block"
          >
            🤝 Connect Nearby
          </button>

          <div className="relative group cursor-pointer hover:bg-gray-100 p-2 rounded-full transition flex items-center justify-center">
            <span className="text-xl">🔔</span>
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border-2 border-white">
              3
            </span>
            <div className="absolute top-full mt-2 right-0 w-max px-3 py-1.5 bg-gray-800 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-lg z-50">
              v2 Roadmap: Real-Time Push Notifications
              <div className="absolute -top-1 right-4 w-2 h-2 bg-gray-800 rotate-45"></div>
            </div>
          </div>

          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 bg-orange-200 border-2 border-white shadow-sm rounded-full cursor-pointer flex items-center justify-center text-xl overflow-hidden"
            >
              👤
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                <button
                  onClick={() => handleNavClick("my-impact")}
                  className="w-full text-left px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-50 transition"
                >
                  My Impact Dashboard
                </button>

                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
