import React, { useState } from "react";
import axios from "axios";

const ConnectNearbyModal = ({ isOpen, onClose }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await axios.get(
        `http://localhost:4000/api/ngoDetail/getNgoDetail?location=${searchLocation}`,
      );

      if (response.data.success) {
        setNgos(response.data.data);
      }
    } catch (error) {
      console.error("Error searching NGOs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="bg-gray-900 p-5 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            🤝 Connect Nearby
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition font-bold text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
          <div className="mb-5 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 shadow-sm select-none">
            <span className="text-blue-500 text-xl">ℹ️</span>
            <div>
              <p className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider mb-1">
                Prototype Environment
              </p>
              <p className="text-sm text-blue-700 leading-snug">
                Currently displaying localized test data. <br />
                <span className="font-semibold">v2 Roadmap:</span> Live
                integration with national NGO registries and real-time
                geographic routing.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Enter a test city (e.g., Delhi, Bangalore)"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-5 py-2 rounded-lg font-bold hover:bg-gray-800 transition shadow-sm"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col gap-3">
            {loading ? (
              <p className="text-center text-gray-500 font-medium py-4 animate-pulse">
                Searching local partners...
              </p>
            ) : hasSearched && ngos.length === 0 ? (
              <div className="text-center bg-white p-6 rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 font-medium">
                  No NGOs found in "{searchLocation}".
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try expanding your search area.
                </p>
              </div>
            ) : (
              ngos.map((ngo) => (
                <div
                  key={ngo._id}
                  className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {ngo.Name}
                    </h3>
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded border border-green-200 uppercase">
                      {ngo.Status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {ngo.Description || "No description provided."}
                  </p>
                  <div className="flex justify-between items-center text-xs font-medium text-gray-500 border-t pt-3">
                    <span className="flex items-center gap-1">
                      📍 {ngo.location}
                    </span>
                    <span className="flex items-center gap-1">
                      📞 {ngo.Phone}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectNearbyModal;
