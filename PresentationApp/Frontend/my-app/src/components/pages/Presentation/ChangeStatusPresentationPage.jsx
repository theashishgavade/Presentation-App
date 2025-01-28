import React, { useState } from "react";
import PresentationService from "../../../services/PresentationService";
import { useNavigate } from "react-router-dom";

const ChangeStatusPresentationPage = () => {
  const [formData, setFormData] = useState({ presentationId: "", status: "ASSIGNED" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PresentationService.changePresentationStatus(formData.presentationId, formData.status);
      alert("Presentation status changed successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to change status.");
    }
  };

  return (
    <div className="change-status-container">
      <h2>Change Presentation Status</h2>
      <form onSubmit={handleSubmit}>
        <label>Presentation ID:</label>
        <input type="number" name="presentationId" value={formData.presentationId} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="ASSIGNED">ASSIGNED</option>
          <option value="ONGOING">ONGOING</option>
        </select>

        <button type="submit">Change Status</button>
      </form>
      <button onClick={() => navigate("/student-dashboard")}>Back</button>
    </div>
  );
};

export default ChangeStatusPresentationPage;
