import React, { useState } from "react";
import UserService from "../../../services/UserService";
import PresentationService from "../../../services/PresentationService";
import RatingService from "../../../services/RatingService";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState("");
  // const [view, setView] = useState("details1");
  const navigate = useNavigate();
  const adminId = parseInt(localStorage.getItem("userId"), 10); // Replace with the actual admin ID.


  const fetchDetails = async () => {
    setView("details");
    try {
      const details = await UserService.getAdminById(adminId);
      setData(details);
    } catch (err) {
      alert(err.response?.data || "Unable to fetch admin details.");
    }
  };

  const fetchAllUsers = async () => {
    setView("users");
    try {
      const users = await UserService.getAllUsers(adminId);
      setData(users.filter((user) => user.role !== "ADMIN")); // Exclude admin users
      console.log(users);

    } catch (err) {
      alert(err.response?.data || "Unable to fetch all users.");
    }
  };

  const fetchPresentationsByUserId = async () => {
    if (!input || isNaN(input)) {
      alert("Please enter a valid User ID.");
      return;
    }
    try {
      const presentations = await PresentationService.getPresentationsByUserId(input);
      setData(presentations);
      setView("presentations");
      // console.log(presentations);

    } catch (err) {
      alert(err.response?.data || "Unable to fetch presentations by User ID.");
    }
  };

  const fetchPresentationsByPresentationId = async () => {
    setView("details1");
    if (!input || isNaN(input)) {
      alert("Please enter a valid Presentation ID.");
      return;
    }
    try {
      const presentation = await PresentationService.getPresentationById(input);
      setData(presentation);
      // console.log(presentation);

    } catch (err) {
      alert(err.response?.data || "Unable to fetch presentations by Presentation ID.");
    }
  };

  const fetchRatingsByPresentationId = async () => {
    setView("details2");
    if (!input || isNaN(input)) {
      alert("Please enter a valid Presentation ID.");
      return;
    }
    try {
      const ratings = await RatingService.getRatingsByPresentationId(input);
      setData(ratings);
      // console.log(ratings);

    } catch (err) {
      alert(err.response?.data || "Unable to fetch ratings by Presentation ID.");
    }
  };

  const fetchRatingsByUserId = async () => {
    if (!input || isNaN(input)) {
      alert("Please enter a valid User ID.");
      return;
    }
    try {
      const ratings = await RatingService.getOverallRatingsByUserId(input);
      setData(ratings);
      setView("ratings")
      // console.log(ratings);

    } catch (err) {
      alert(err.response?.data || "Unable to fetch ratings by User ID.");
    }
  };

  const sendRatingsToUser = async () => {
    if (!input || isNaN(input)) {
      alert("Please enter a valid User ID.");
      return;
    }
    try {
      const response = await RatingService.sendRatingsToUser(input);
      alert(response); // Success message
    } catch (err) {
      alert(err.response?.data || "Unable to send ratings to the user.");
    }
  };

  const logout = async () => {
    try {
      await UserService.logout(adminId);
      alert("Logout successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Unable to logout.");
    }
  };

  // CSS for Layout and Styling
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "97.8vh",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#333",
    borderBottom: "3px solid #4CAF50",
    fontWeight: "600",
    transition: "color 0.3s ease",
  };

  const leftPanelStyle = {
    width: "30%",
    backgroundColor: "#ffffff",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderRight: "1px solid #ddd",
  };

  const rightPanelStyle = {
    flex: 1,
    height: "calc(72vh - 80px)",
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
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

  const logoutButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#b02a37",
  };

  const footerStyle = {
    marginTop: "1px",  // Push footer to the bottom
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
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


  const headerStyle1 = {
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

  const welcomeTextStyle = {
    fontSize: "2.5rem",
    textAlign: "center",
    color: "#333",
    fontWeight: "600",
    transition: "color 0.3s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80%", // makes sure it takes full viewport height for vertical centering
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

  const cellStyle1 = {
    border: "1px solid #ddd", // Light border for cells
    padding: "12px 20px", // Comfortable padding
    textAlign: "center", // Centered text
    fontSize: "15px", // Standard font size
    color: "#555", // Darker color for text for improved contrast
    backgroundColor: "#fff", // White background for clean look
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out", // Smooth hover effect
    whiteSpace: "nowrap"
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
    "&:nthchild(even)": {
      backgroundColor: "#fafafa", // Slightly darker background for even rows
    },
    "&:nthchild(odd)": {
      backgroundColor: "#fff", // White background for odd rows
    },
    "&:hover": {
      backgroundColor: "#f0f8ff", // Very light blue on hover for rows
      transform: "scale(1.02)", // Slight scaling effect for better interaction feel
    },
    transition: "background-color 0.3s ease, transform 0.2s ease-in-out",
  };

  const renderContent = () => {
    if (view === "details" && !Array.isArray(data)) {
      return renderSingleObject(data);
    }
    if (view === "details1" && !Array.isArray(data)) {
      return renderPresentationObject(data);
    }
    if (view === "details2" && !Array.isArray(data)) {
      return renderRatingObject(data);
    }
    if (view === "users" && Array.isArray(data)) {
      return renderUserTable(data);
    }
    if (view === "presentations" && Array.isArray(data)) {
      return renderPresentationsTable(data);
    }
    if (view === "ratings" && Array.isArray(data)) {
      return renderRatingTable(data);
    }
  };

  const renderSingleObject = (details) => (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '10px', width: '80%', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333' }}> Admin Details <hr /></h2>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Admin ID:</strong> {details.id}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Admin Name:</strong> {details.name}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Email Address:</strong> {details.email}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Phone Number:</strong> {details.phone}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Current Status:</strong> {details.status}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Your Role:</strong> {details.role}</p>
    </div>
  );

  const renderPresentationObject = (details1) => (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '10px', width: '80%', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#333' }}> Presentation Details <hr /></h2>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>User Id</strong> {details1.userId}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Presentation ID:</strong> {details1.id}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Course:</strong> {details1.course}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Current Status:</strong> {details1.presentationStatus}</p>
      {details1.presentationTotalScore && <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Total Score:</strong> {details1.presentationTotalScore}</p>}
    </div>
  );

  const renderRatingObject = (details2) => (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', padding: '1px', borderRadius: '10px', width: '80%', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#333' }}> Rating Details <hr /></h2>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>User Id</strong> {details2.userId}</p>
      {/* <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Presentation ID:</strong> {details2.id}</p> */}
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Communication:</strong> {details2.communication}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Confidence:</strong> {details2.confidence}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Content:</strong> {details2.content}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Interaction:</strong> {details2.interaction}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Liveliness:</strong> {details2.liveliness}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Usage Props:</strong> {details2.usageProps}</p>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', margin: '10px 0', color: '#555' }}><strong>Total Score:</strong> {details2.totalScore}</p>
    </div>
  );

  const renderUserTable = (data) => (
    <div>
      <h2 style={{ textAlign: 'center' }}>Student's details</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle1}>Student Id</th>
            <th style={headerStyle1}>Name</th>
            <th style={headerStyle1}>Email</th>
            <th style={headerStyle1}>Phone No.</th>
            <th style={headerStyle1}>Status</th>
            <th style={headerStyle1}>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => a.id - b.id).map((user, index) => (
            <tr key={index} style={rowStyle}>
              <td style={cellStyle}>{user.id}</td>
              <td style={cellStyle1}>{user.name}</td>
              <td style={cellStyle}>{user.email}</td>
              <td style={cellStyle}>{user.phone}</td>
              <td style={cellStyle}>{user.status}</td>
              <td style={finalStyle}>{user.userTotalScore || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPresentationsTable = (data) => (
    <div>
      <h2 style={{ textAlign: 'center' }}>Assigned Presentations For User Id: {data[0].userId}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle1}>Id</th>
            <th style={headerStyle1}>Course</th>
            <th style={headerStyle1}>Status</th>
            <th style={headerStyle1}>Total Score</th>
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

  const renderRatingTable = (data) => (
    <div>
      <h2 style={{ textAlign: 'center' }}>Assigned Ratings For User Id: {data[0].userId}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerStyle1}>Rating Id</th>
            <th style={headerStyle1}>Presentation Id</th>
            <th style={headerStyle1}>Comm.</th>
            <th style={headerStyle1}>Confidence</th>
            <th style={headerStyle1}>Content</th>
            <th style={headerStyle1}>Interaction</th>
            <th style={headerStyle1}>Liveliness</th>
            <th style={headerStyle1}>Usage Props</th>
            <th style={headerStyle1}>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {data.sort((a, b) => a.id - b.id).map((rating, index) => (
            <tr key={index} style={rowStyle}>
              <td style={cellStyle}>{rating.id}</td>
              <td style={cellStyle}>{rating.presentationId}</td>
              <td style={cellStyle}>{rating.communication}</td>
              <td style={cellStyle}>{rating.confidence}</td>
              <td style={cellStyle}>{rating.content}</td>
              <td style={cellStyle}>{rating.interaction}</td>
              <td style={cellStyle}>{rating.liveliness}</td>
              <td style={cellStyle}>{rating.usageProps}</td>
              <td style={finalStyle}>{rating.totalScore || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Header */}
      <h1
        style={headerStyle}
        onMouseOver={(e) => (e.target.style.color = "#4CAF50")}
        onMouseOut={(e) => (e.target.style.color = "#333")}
      >
        Admin Dashboard
      </h1>

      {/* Main Content */}
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left Panel */}
        <div style={leftPanelStyle}>
          <h1 style={{ margin: 0, textAlign: "center", color: "#007bff" }}>Admin Actions</h1>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchDetails}
          >
            Admin Details
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchAllUsers}
          >
            Fetch all Students
          </button>

          <p></p>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => navigate("/assign-presentation")}
          >
            Assign Presentations
          </button>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => navigate("/rate-presentation")}
          >
            Rate Presentation
          </button>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={() => navigate("/change-status-user")}
          >
            Change User Status
          </button>

          <p><hr /></p>

          <button
            style={logoutButtonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = logoutButtonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)}
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* Right Panel */}
        <div style={rightPanelStyle}>
          {renderContent() ? (
            renderContent() // If content exists, show it
          ) : (
            <h1 style={welcomeTextStyle}>Welcome to Admin Portal !!</h1> // If no content, show h1
          )}
        </div>

      </div>

      {/* Footer */}
      <div style={footerStyle}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <input
            type="text"
            placeholder="Enter User/Presentation ID"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "60%",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchPresentationsByUserId}
          >
            Presentations By User Id
          </button>
          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchRatingsByUserId}
          >
            Get Ratings by User ID
          </button>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchPresentationsByPresentationId}
          >
            Fetch Presentations by Presentation ID
          </button>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={fetchRatingsByPresentationId}
          >
            Get Ratings by Presentation ID
          </button>

          <button
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
            onClick={sendRatingsToUser}
          >
            Send Ratings to User
          </button>

        </div>
      </div>
    </div>
  );
};



export default AdminDashboard;
