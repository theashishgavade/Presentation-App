import React, { useState } from "react";
import PresentationService from "../../../services/PresentationService";
import { useNavigate } from "react-router-dom";

const AssignPresentationPage = () => {
  const [formData, setFormData] = useState({ userId: "", course: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await PresentationService.assignPresentation(formData.userId, formData);
      alert("Presentation assigned successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to assign presentation.");
    }
  };

  // CSS for Layout and Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "97.8vh",
    fontFamily: "Arial, sans-serif",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const headerStyle = {
    fontSize: "2.5rem",
    color: "#333",
    fontWeight: "600",
    marginBottom: "20px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "15px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    marginTop: "15px", // Added margin for spacing between form and back button
  };

  const backButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Assign Presentation</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Student ID:</label>
        <input
          type="number"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>Course:</label>
        <input
          type="text"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Assign
        </button>
      </form>

      {/* Back Button (outside the form container for correct alignment) */}
      <button
        style={backButtonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = backButtonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = backButtonStyle.backgroundColor)}
        onClick={() => navigate("/admin-dashboard")}
      >
        Back
      </button>
    </div>
  );
};

export default AssignPresentationPage;
