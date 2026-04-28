import React, { useState } from 'react';
import axios from 'axios';

const IssueModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '', category: 'General', urgency: 'Medium', location: '', peopleAffected: '', volunteersNeeded: '', description: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You must be logged in to raise an alert.");
        setLoading(false);
        return;
      }

      const submitData = new FormData();
      Object.keys(formData).forEach(key => submitData.append(key, formData[key]));

      // 🚨 CRITICAL: CHANGE THIS URL TO YOUR ACTUAL RENDER BACKEND URL 🚨
      const response = await axios.post(
        "https://impacthub-hackathon.onrender.com/api/RaiseQuest/createRequest", 
        submitData,
        { headers: { token: token, 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        setFormData({ title: '', category: 'General', urgency: 'Medium', location: '', peopleAffected: '', volunteersNeeded: '', description: '' });
        if (onSuccess) onSuccess();
        onClose();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting alert:", error);
      alert("Failed to submit alert. Check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white w-[95%] sm:w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <div className="bg-red-600 p-5 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">🚨 Raise Community Alert</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition font-bold text-xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto bg-gray-50 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Issue Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500">
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Medical Need">Medical Need</option>
                <option value="Emergency Rescue">Emergency Rescue</option>
                <option value="General">General Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Urgency</label>
              <select name="urgency" value={formData.urgency} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-red-500">
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Exact Location</label>
            <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">People Affected</label>
              <input required type="number" name="peopleAffected" value={formData.peopleAffected} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Volunteers Needed</label>
              <input required type="number" name="volunteersNeeded" value={formData.volunteersNeeded} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Detailed Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"></textarea>
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition">Cancel</button>
            <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-lg shadow-md transition disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueModal;