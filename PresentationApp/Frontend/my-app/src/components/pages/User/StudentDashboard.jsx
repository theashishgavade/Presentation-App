import React, { useState, useEffect, useCallback } from "react";
import UserService from "../../../services/UserService";
import PresentationService from "../../../services/PresentationService";
import RatingService from "../../../services/RatingService";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("details"); // Default to "details"
  const navigate = useNavigate();

  // Retrieve the userId from the session (localStorage)
  const userId = parseInt(localStorage.getItem("userId"), 10);

  const fetchDetails = useCallback(async () => {
    setView("details");
    try {
      const details = await UserService.getStudentById(userId);
      setData(details);
    } catch (err) {
      alert(err.response?.data || "Unable to fetch user details.");
    }
  }, [userId]);

  const fetchPresentations = async () => {
    setView("presentations");
    try {
      const presentations = await PresentationService.getPresentationsByUserId(userId);
      setData(presentations);
    } catch (err) {
      alert(err.response?.data || "Unable to fetch assigned presentations.");
    }
  };

  const fetchRatings = async () => {
    setView("ratings");
    try {
      const ratings = await RatingService.getOverallRatingsByUserId(userId);
      setData(ratings);
    } catch (err) {
      alert(err.response?.data || "Unable to fetch ratings.");
    }
  };

  const logout = async () => {
    try {
      await UserService.logout(userId);
      alert("Logout successful!");
      localStorage.clear(); // Clear session
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Unable to logout.");
    }
  };

  // Automatically fetch details on page load
  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  // CSS for Layout and Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    height: "80vh",
    backgroundColor: "#f4f5fa",
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
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
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

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  // Updated Table Styles
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
    backgroundColor: "#ebebeb", // Light Blue for the header
    color: "#555", // Dark text for readability
    fontWeight: "600",
    textAlign: "center",
    padding: "12px 15px",
    borderBottom: "2px solid #ddd", // Subtle border below header
    fontSize: "16px", // Slightly larger font for header
    letterSpacing: "0.3px",
    // textTransform: "uppercase", // Uppercase text for header emphasis
  };

  const cellStyle = {
    border: "1px solid #ddd", // Light border for cells
    padding: "12px 20px", // Comfortable padding
    textAlign: "center", // Centered text
    fontSize: "15px", // Standard font size
    color: "#555", // Darker color for text for improved contrast
    backgroundColor: "#fff", // White background for clean look
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out", // Smooth hover effect
  };

  const finalStyle = {
    border: "1px solid #ccc", // Light border for cells
    padding: "12px 20px", // Comfortable padding
    textAlign: "center", // Centered text
    fontSize: "15px", // Standard font size
    fontWeight: "600",
    color: "#555", // Darker color for text for improved contrast
    backgroundColor: "#fff", // White background for clean look
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out", // Smooth hover effect
  };

  const rowStyle = {
    "&:nth-child(even)": {
      backgroundColor: "#fafafa", // Slightly darker background for even rows
    },
    "&:nth-child(odd)": {
      backgroundColor: "#fff", // White background for odd rows
    },
    "&:hover": {
      backgroundColor: "#f0f8ff", // Very light blue on hover for rows
      transform: "scale(1.02)", // Slight scaling effect for better interaction feel
    },
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  };

  const renderSingleObject = (details) => (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '10px', width: '80%', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333' }}> Student Details <hr /></h2>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Student ID:</strong> {details.id}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Student Name:</strong> {details.name}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Email Address:</strong> {details.email}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Phone Number:</strong> {details.phone}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Current Status:</strong> {details.status}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Your Role:</strong> {details.role}</p>
      {details.userTotalScore && <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Total Score:</strong> {details.userTotalScore}</p>}
    </div>
  );


  const renderPresentationsTable = (data) => (
    <div>
      <h2 style={{ textAlign: 'center' }}>Assigned Presentations For User Id: {userId}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Id</th>
            <th style={headerStyle}>Course</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => a.id - b.id).map((presentation, index) => (
            <tr key={index} style={rowStyle}>
              <td style={cellStyle}>{presentation.id}</td>
              <td style={cellStyle}>{presentation.course}</td>
              <td style={cellStyle}>{presentation.presentationStatus}</td>
              <td style={finalStyle}>{presentation.presentationTotalScore || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRatingsTable = (data) => (
    <div>
      <h2 style={{ textAlign: 'center' }}>Ratings For User Id: {userId}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle}>Id</th>
            <th style={headerStyle}>Communication</th>
            <th style={headerStyle}>Confidence</th>
            <th style={headerStyle}>Content</th>
            <th style={headerStyle}>Interaction</th>
            <th style={headerStyle}>Liveliness</th>
            <th style={headerStyle}>Usage Props</th>
            <th style={headerStyle}>Final Marks</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => a.id - b.id).map((rating, index) => (
            <tr key={index} style={rowStyle}>
              <td style={cellStyle}>{rating.presentationId}</td>
              <td style={cellStyle}>{rating.communication}</td>
              <td style={cellStyle}>{rating.confidence}</td>
              <td style={cellStyle}>{rating.content}</td>
              <td style={cellStyle}>{rating.interaction}</td>
              <td style={cellStyle}>{rating.liveliness}</td>
              <td style={cellStyle}>{rating.usageProps}</td>
              <td style={finalStyle}>{rating.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    if (view === "details" && !Array.isArray(data)) {
      return renderSingleObject(data);
    }
    if (view === "presentations" && Array.isArray(data)) {
      return renderPresentationsTable(data);
    }
    if (view === "ratings" && Array.isArray(data)) {
      return renderRatingsTable(data);
    }
    return <p>No data available.</p>;
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
        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <h1 style={{ textAlign:'center',color: "#007bff" }}>Action Center</h1>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchDetails}
          >
            Show Details
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchPresentations}
          >
            Get Assigned Presentations
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchRatings}
          >
            Get Ratings
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => navigate("/update-presentation-status")}
          >
            Change Status
          </button>
          <button
            style={{ ...logoutButtonStyle, logoutButtonHoverStyle }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#b02a37")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
            onClick={logout}
          >Logout</button>
        </div>

        {/* Right Panel */}
        <div style={rightPanelStyle}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
