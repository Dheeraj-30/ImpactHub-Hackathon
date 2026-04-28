import React, { useState } from "react";
import axios from "axios";

const AlertCard = ({
  id,
  urgency,
  time,
  title,
  description,
  location,
  people,
  volunteersNeeded,
  category,
  isMyImpactPage,
  onSuccess,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const getBorderColor = () => {
    const level = urgency ? urgency.toLowerCase() : "";

    switch (level) {
      case "critical":
        return "border-red-700";
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-400";
      case "low":
        return "border-blue-400";
      default:
        return "border-gray-300";
    }
  };

  const getBadgeColor = () => {
    const level = urgency ? urgency.toLowerCase() : "";

    switch (level) {
      case "critical":
        return "bg-red-200 text-red-900";
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleResolve = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://impacthub-hackathon.onrender.com/api/RaiseQuest/resolveRequest",
        { id: id },
        { headers: { token } },
      );

      if (response.data.success) {
        alert("Mission Accomplished! Thank you for your service.");
        window.location.reload(); // Quick refresh to clear the screen
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to accept a request!");
        return;
      }

      const response = await axios.post(
        "https://impacthub-hackathon.onrender.com/api/RaiseQuest/AcceptRequest",
        { id: id },
        { headers: { token: token } },
      );

      if (response.data.success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`select-none bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-l-4 ${getBorderColor()} hover:shadow-md transition mb-4`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <span
            className={`text-[10px] font-bold px-2 py-1 rounded-md border border-white/20 shadow-sm ${getBadgeColor()}`}
          >
            {urgency}
          </span>
          <span className="text-xs text-gray-500 font-medium">{time}</span>
        </div>

        {isMyImpactPage ? (
          <button
            onClick={handleResolve}
            className="bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            ✅ Mark as Resolved
          </button>
        ) : volunteersNeeded > 0 ? (
          <button
            onClick={handleAccept}
            className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition shadow-sm"
          >
            Accept Request ({volunteersNeeded} needed)
          </button>
        ) : (
          <span className="bg-gray-100 text-gray-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 select-none">
            Broadcast Only
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold text-on-surface mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 bg-surface-container w-fit px-3 py-2 rounded-lg">
        <span className="flex items-center gap-1">📍 {location}</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1">👥 {people}</span>
        <span className="text-gray-300">|</span>
        <span className="flex items-center gap-1">🏷️ {category}</span>
      </div>
    </div>
  );
};

export default AlertCard;
