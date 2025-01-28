import React, { useState } from "react";
import RatingService from "../../../services/RatingService";
import { useNavigate } from "react-router-dom";

const RatePresentationPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    presentationId: "",
    communication: 1,
    confidence: 1,
    content: 1,
    interaction: 1,
    liveliness: 1,
    usageProps: 1,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RatingService.ratePresentation(formData.userId, formData.presentationId, formData);
      alert("Rating submitted successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to submit rating.");
    }
  };

  // CSS for Layout and Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "92vh",
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
    gap: "12px",
    backgroundColor: "#ffffff",
    padding: "25px",
    borderRadius: "18px",
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

  const selectStyle = {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "1rem",
  };

  const buttonStyle = {
    padding: "10px",
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
    padding: "12px 40px",
  };

  const backButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Rate Presentation</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <strong>
          <label>Student ID :
            <input
              type="number"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>
        </strong>


        <strong>
          <label>Presentation ID:
            <input
              type="number"
              name="presentationId"
              value={formData.presentationId}
              onChange={handleChange}
              required
              style={inputStyle}
            /></label>
        </strong>


        {["communication", "confidence", "content", "interaction", "liveliness", "usageProps"].map((field) => (
          <div key={field}>
            <strong><label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label></strong>
            <select
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={selectStyle}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Submit Rating
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

export default RatePresentationPage;
