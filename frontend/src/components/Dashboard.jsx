import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertCard from "./AlertCard";

const Dashboard = ({ refreshKey }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const [activeFilter, setActiveFilter] = useState("All");
  const [userLocation, setUserLocation] = useState("");

  const [stats, setStats] = useState({
    active: 0,
    critical: 0,
    fulfilled: 1284,
  });
  const [localRefresh, setLocalRefresh] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "https://impacthub-hackathon.onrender.com/api/RaiseQuest/getAllRequest",
          {
            headers: { token: token },
          },
        );

        if (response.data.success) {
          const realAlerts = response.data.data;
          setAlerts(realAlerts);

          setStats({
            active: realAlerts.length,
            critical: realAlerts.filter(
              (a) => a.urgency.toLowerCase() === "critical",
            ).length,
            fulfilled: 1284 + Math.floor(Math.random() * 10),
          });
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [refreshKey, localRefresh]);

  const formatTime = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);

    if (filterType === "Nearest") {
     
      const loc = prompt(
        "Enter your current city or neighborhood (e.g., 'Thanesar', 'Kurukshetra'):",
      );
      if (loc) {
        setUserLocation(loc);
      } else {
       
        setActiveFilter("All");
      }
    }
  };

 
  const filteredAlerts = alerts.filter((alert) => {
    if (activeFilter === "All") return true;

    if (activeFilter === "Critical") {
      return alert.urgency.toLowerCase() === "critical";
    }

    if (activeFilter === "Today") {
      const today = new Date().toDateString();
      const alertDate = new Date(alert.createdAt).toDateString();
      return today === alertDate;
    }

    if (activeFilter === "Nearest") {
     
      if (!alert.location) return false;

      
      const dbLocation = alert.location.toLowerCase();
      const searchLocation = userLocation.toLowerCase();

      return dbLocation.includes(searchLocation);
    }

    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
      <div className=" select-none xl:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-on-surface">
              Active Community Alerts
            </h2>
            <p className="text-sm text-gray-500">
              Real-time reports from the field
            </p>
          </div>

         
          <div className="select-none flex bg-surface-container rounded-lg border border-outline-variant/30 p-1 shadow-sm text-sm font-medium">
            <button
              onClick={() => handleFilterClick("All")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeFilter === "All" ? "bg-surface-container-lowest text-on-surface shadow-sm" : "text-gray-500 hover:text-on-surface"}`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterClick("Critical")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeFilter === "Critical" ? "bg-surface-container-lowest text-red-600 shadow-sm" : "text-gray-500 hover:text-on-surface"}`}
            >
              Critical
            </button>
            <button
              onClick={() => handleFilterClick("Today")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeFilter === "Today" ? "bg-surface-container-lowest text-on-surface shadow-sm" : "text-gray-500 hover:text-on-surface"}`}
            >
              Today
            </button>
            <button
              onClick={() => handleFilterClick("Nearest")}
              className={`px-4 py-1.5 rounded-md transition-all ${activeFilter === "Nearest" ? "bg-surface-container-lowest text-primary shadow-sm" : "text-gray-500 hover:text-on-surface"}`}
            >
              Nearest
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="p-10 text-center text-gray-500 font-medium animate-pulse">
              Loading real-time alerts...
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="p-10 text-center text-gray-500 font-medium bg-surface-container rounded-xl border border-dashed border-gray-300">
              {activeFilter === "Nearest"
                ? `No active alerts found near "${userLocation}".`
                : "No active alerts match this filter. Everything is safe!"}
            </div>
          ) : (
           
            filteredAlerts.map((alert) => (
              <AlertCard
                key={alert._id}
                id={alert._id}
                urgency={alert.urgency}
                time={formatTime(alert.createdAt)}
                title={alert.title}
                description={alert.description}
                location={alert.location}
                people={`${alert.peopleAffected} Affected`}
                volunteersNeeded={alert.volunteersNeeded}
                category={alert.category}
                onSuccess={() => setLocalRefresh((prev) => prev + 1)}
              />
            ))
          )}
        </div>
      </div>


      <div className="space-y-6 select-none">
       
        <div className="bg-surface-container-lowest p-6 rounded-[2rem] shadow-sm border border-outline-variant/30">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
            Live Impact Analytics
          </h3>
        
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="border border-outline-variant/30 bg-surface-container p-3 rounded-xl">
              <p className="text-[10px] font-bold text-gray-500 uppercase">
                Fulfilled
              </p>
              
              <p className="text-xl font-bold text-on-surface">
                {stats.fulfilled}{" "}
                <span className="text-xs text-secondary">+12%</span>
              </p>
            </div>
            <div className="border border-outline-variant/30 bg-surface-container p-3 rounded-xl">
              <p className="text-[10px] font-bold text-gray-500 uppercase">
                Total Active
              </p>
          
              <p className="text-xl font-bold text-on-surface">
                {stats.active}
              </p>
            </div>
            <div className="border border-outline-variant/30 bg-surface-container p-3 rounded-xl">
              <p className="text-[10px] font-bold text-red-500 uppercase">
                Critical
              </p>
              
              <p className="text-xl font-bold text-red-600">{stats.critical}</p>
            </div>
          </div>
          
          <div className="relative group h-40 border border-outline-variant/30 rounded-xl overflow-hidden cursor-pointer select-none shadow-sm mb-4">
          
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Activity Chart Preview"
              className="w-full h-full object-cover group-hover:scale-105 group-hover:blur-[2px] transition-all duration-500"
            />

            
            <div className="absolute inset-0 bg-gray-900/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-2xl mb-1">📊</span>
              <span className="text-white text-sm font-bold tracking-wide">
                Live Data Visualization
              </span>
              <span className="text-blue-300 text-[10px] font-bold tracking-wider uppercase mt-1">
                Integration Planned for v2
              </span>
            </div>
          </div>
          <div className="bg-primary-container p-4 rounded-xl text-on-primary flex justify-between items-center">
            <div>
              <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
                Peak Demand Hour
              </p>
              <p className="font-bold">
                14:00 - 16:00{" "}
                <span className="text-gray-400 text-xs font-normal">
                  Daily Avg
                </span>
              </p>
            </div>
            <span>📈</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
