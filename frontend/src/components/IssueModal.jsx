import React, { useState } from "react";
import axios from "axios";

const IssueModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Food",
    peopleAffected: 0,
    volunteersNeeded: 0,
    urgency: "Medium",
    location: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("category", formData.category);
      submitData.append("peopleAffected", formData.peopleAffected);
      submitData.append("volunteersNeeded", formData.volunteersNeeded);
      submitData.append("urgency", formData.urgency);
      submitData.append("location", formData.location);

      if (image) {
        submitData.append("image", image);
      }

      const response = await axios.post(
        "http://localhost:4000/api/RaiseQuest/addRequest",
        submitData,
        {
          headers: { token: token },
        },
      );

      if (response.data.success) {
        setStep(2);
        if (onSuccess) onSuccess();
      } else {
        alert("Failed to create alert: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting request.");
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      title: "",
      description: "",
      category: "Food",
      peopleAffected: 0,
      urgency: "Medium",
      location: "",
    });
    setImage(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end transition-all">
      <div className="bg-surface-container-lowest w-full max-w-md h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/30">
          <h2 className="text-xl font-bold text-on-surface">Report an Issue</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="p-6 flex-grow overflow-y-auto font-inter">
          {step === 1 ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1 border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                <label className="text-xs font-bold text-gray-500 uppercase cursor-pointer">
                  {image
                    ? "Photo Selected: " + image.name
                    : "📷 Upload Photo (Optional)"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Incident Title
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Briefly describe the issue"
                  className="bg-surface-container p-3 rounded-lg outline-none focus:ring-2 focus:ring-secondary/50 text-on-surface"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Description
                </label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Provide more details..."
                  className="bg-surface-container p-3 rounded-lg outline-none focus:ring-2 focus:ring-secondary/50 text-on-surface resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="bg-surface-container p-3 rounded-lg outline-none text-on-surface"
                  >
                    <option value="Food">Food</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Disaster Relief">Disaster Relief</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    People Affected
                  </label>
                  <input
                    required
                    type="number"
                    name="peopleAffected"
                    value={formData.peopleAffected}
                    onChange={handleChange}
                    className="bg-surface-container p-3 rounded-lg outline-none text-on-surface"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">
                    Volunteers Needed
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    name="volunteersNeeded"
                    value={formData.volunteersNeeded}
                    onChange={handleChange}
                    className="bg-surface-container p-3 rounded-lg outline-none text-on-surface"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Urgency Level
                </label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="bg-surface-container p-3 rounded-lg outline-none text-on-surface"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">
                  Location
                </label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter coordinates or address"
                  className="bg-surface-container p-3 rounded-lg outline-none text-on-surface"
                />
              </div>

              <button
                type="submit"
                className="mt-2 bg-primary text-on-primary font-bold p-4 rounded-xl hover:bg-primary/90 transition-all"
              >
                Create Alert
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center mt-10">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-on-surface mb-2">
                Alert Created Successfully
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                Your report has been logged and the relevant teams have been
                notified.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-primary text-on-primary font-bold p-4 rounded-xl hover:bg-primary/90 transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueModal;
