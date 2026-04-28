import React, { useState, useEffect } from "react";
import axios from "axios";
import AlertCard from "./AlertCard";

const MyImpact = () => {
  const [acceptedMissions, setAcceptedMissions] = useState([]);
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("missions");

  useEffect(() => {
    const fetchMyMissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:4000/api/RaiseQuest/GetMyAcceptedRequests",
          {
            headers: { token },
          },
        );

        if (response.data.success) {
          setAcceptedMissions(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching missions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyMissions();
  }, []);

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/30 mb-8 flex items-center gap-6">
        <div className="w-24 h-24 bg-secondary text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md select-none">
          P
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Impact Profile
          </h1>
          <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
            📍 Volunteer Region: Kurukshetra, Haryana
          </p>
          <div className="flex gap-4 mt-4 select-none">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
              Trusted Responder
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
              {acceptedMissions.length} Active Missions
            </span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-outline-variant/50 mb-6 select-none">
        <button
          onClick={() => setActiveTab("missions")}
          className={`pb-3 px-6 text-sm font-bold transition-colors ${
            activeTab === "missions"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          My Active Missions
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`pb-3 px-6 text-sm font-bold transition-colors ${
            activeTab === "reports"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Alerts I've Raised
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {activeTab === "missions" &&
          (loading ? (
            <div className="p-10 text-center text-gray-500 animate-pulse">
              Loading your missions...
            </div>
          ) : acceptedMissions.length === 0 ? (
            <div className="bg-surface-container p-10 rounded-2xl text-center border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                No Active Missions
              </h3>
              <p className="text-gray-500 text-sm">
                You haven't accepted any community alerts yet.
              </p>
            </div>
          ) : (
            acceptedMissions.map((alert) => (
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
                isMyImpactPage={true}
              />
            ))
          ))}

        {activeTab === "reports" && (
          <div className="bg-surface-container p-10 rounded-2xl text-center border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-bold text-gray-700 mb-2">
              My Raised Alerts
            </h3>
            <p className="text-gray-500 text-sm">
              v2 Roadmap: Interactive history of alerts raised by your account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyImpact;
