import React, { useState } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const ChangeStatusUserPage = () => {
  const [formData, setFormData] = useState({ userId: "", status: "ACTIVE" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateUserStatus(formData.userId, formData.status);
      alert("User status updated successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to update status.");
    }
  };

  // CSS Styles for the Page
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90vh",
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  };

  const headerStyle = {
    fontSize: "2.5rem",
    color: "#333",
    fontWeight: "600",
    marginBottom: "30px",
    borderBottom: "3px solid #4CAF50",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const selectStyle = {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    width: "200px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
    marginTop: "20px", // Added margin for spacing between form and back button
  };

  const backButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Change User Status</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <strong><label>User ID:</label></strong>
        <input
          style={inputStyle}
          type="number"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <strong><label>Status:</label></strong>
        <select style={selectStyle} name="status" value={formData.status} onChange={handleChange}>
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
        </select>

        {/* Centering only the Change Status button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Change Status
          </button>
        </div>
      </form>

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

export default ChangeStatusUserPage;
