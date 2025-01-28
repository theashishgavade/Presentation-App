import React, { useState, useEffect, useCallback } from "react";
import PresentationService from "../../../services/PresentationService";
import { useNavigate } from "react-router-dom";

const UpdatePresentationStatusPage = () => {
  const [formData, setFormData] = useState({
    presentationId: "",
    status: "ASSIGNED",
  });
  const [assignedPresentations, setAssignedPresentations] = useState([]);
  const navigate = useNavigate();

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  const fetchAssignedPresentations = useCallback(async () => {
    if (!userId) {
      alert("User ID not found! Please log in.");
      navigate("/login"); // Redirect to login if userId is not found
      return;
    }

    try {
      const presentations = await PresentationService.getPresentationsByUserId(userId);
      setAssignedPresentations(presentations);
    } catch (error) {
      alert("Error: " + (error.response?.data || "Unable to fetch presentations."));
    }
  }, [userId, navigate]);

  useEffect(() => {
    fetchAssignedPresentations();
  }, [fetchAssignedPresentations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the userId from localStorage for the update
      await PresentationService.changePresentationStatus(
        userId, // Passed from localStorage
        formData.presentationId,
        formData.status
      );
      alert("Presentation status updated successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      alert("Error: " + (error.response?.data || "Unable to update status."));
    }
  };

  // CSS Styles for the Left and Right Panel Layout
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    height: "80vh",
    backgroundColor: "#f4f5fa",
    color: "#333",
    fontFamily: "Arial, sans-serif",
  };

  const leftPanelStyle = {
    width: "30%",
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    borderRight: "1px solid #ddd",
  };

  const rightPanelStyle = {
    width: "70%",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s, transform 0.2s",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const selectStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const backButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  const backButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  const tableStyle = {
    width: "80%", // Adjusted width to be smaller for better centering
    borderCollapse: "collapse",
    marginTop: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)", // Subtle shadow for a floating effect
    borderRadius: "10px",
    overflow: "hidden",
    marginLeft: "auto", // Centers the table horizontally
    marginRight: "auto", // Centers the table horizontally
  };

  const headerStyle = {
    backgroundColor: '#ADD8E6', // Light Blue for the header
    color: '#333', // Dark text for readability
    fontWeight: '600',
    textAlign: 'center',
    padding: '12px 15px',
    borderBottom: '2px solid #ddd', // Subtle border below header
    fontSize: '16px', // Slightly larger font for header
    letterSpacing: '0.3px',
    textTransform: 'uppercase', // Uppercase text for header emphasis
  };

  const cellStyle = {
    border: '1px solid #ddd', // Light border for cells
    padding: '12px 20px', // Comfortable padding
    textAlign: 'center', // Centered text
    fontSize: '15px', // Standard font size
    color: '#555', // Darker color for text for improved contrast
    backgroundColor: '#fff', // White background for clean look
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out', // Smooth hover effect
  };

  const rowStyle = {
    '&:nth-child(even)': {
      backgroundColor: '#fafafa', // Slightly darker background for even rows
    },
    '&:nth-child(odd)': {
      backgroundColor: '#fff', // White background for odd rows
    },
    '&:hover': {
      backgroundColor: '#f0f8ff', // Very light blue on hover for rows
      transform: 'scale(1.02)', // Slight scaling effect for better interaction feel
    },
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
  };


  return (
    <div>
      <h1 style={{
        fontSize: '2.8rem',
        textAlign: 'center',
        color: '#333',
        borderBottom: '3px solid #4CAF50',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
        onMouseOver={(e) => e.target.style.color = '#4CAF50'}
        onMouseOut={(e) => e.target.style.color = '#333'}>
        Student Dashboard
      </h1>
      <div style={containerStyle}>
        <div style={leftPanelStyle}>
          <h1 style={{ color: "#007bff" }}>Update Presentation Status</h1>

          <form style={formStyle} onSubmit={handleSubmit}>
            <label>Presentation ID:</label>
            <input
              style={inputStyle}
              type="number"
              name="presentationId"
              value={formData.presentationId}
              onChange={handleChange}
              required
            />

            <label>Status:</label>
            <select style={selectStyle} name="status" value={formData.status} onChange={handleChange}>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="ONGOING">ONGOING</option>
            </select>

            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              type="submit"
            >
              Update
            </button>
            <button
              style={backButtonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = backButtonHoverStyle.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = backButtonStyle.backgroundColor)}
              onClick={() => navigate("/student-dashboard")}
            >
              Back
            </button>
          </form>
        </div>


        {/* Right Panel */}
        {/* Right Panel */}
        <div style={rightPanelStyle}>
          <h2 style={{ textAlign: 'center' }}>Assigned Presentations For User Id: {userId}</h2>
          {assignedPresentations.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr style={headerStyle}>
                  <th style={cellStyle}>Presentation Id</th>
                  <th style={cellStyle}>Course</th>
                  <th style={cellStyle}>Status</th>
                  <th style={cellStyle}>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {assignedPresentations
                  .sort((a, b) => a.id - b.id) // Sorting by presentationId in ascending order
                  .map((presentation, index) => (
                    <tr key={index} style={rowStyle}>
                      <td style={cellStyle}>{presentation.id}</td>
                      <td style={cellStyle}>{presentation.course}</td>
                      <td style={cellStyle}>{presentation.presentationStatus}</td>
                      <td style={cellStyle}>{presentation.presentationTotalScore || "N/A"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>No assigned presentations found.</p>
          )}
        </div>


      </div>
    </div>
  );
};

export default UpdatePresentationStatusPage;
