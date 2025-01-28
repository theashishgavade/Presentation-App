import React, { useState } from "react";
import ReportService from "../../services/ReportService";
import { useNavigate } from "react-router-dom";

const SendEmailPage = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await ReportService.sendProgressReportByEmail(userId);
      alert("Email sent successfully!");
      navigate("/admin-dashboard");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to send email.");
    }
  };

  return (
    <div className="send-email-container">
      <h2>Send Progress Report Email</h2>
      <form onSubmit={handleSendEmail}>
        <label>Enter Student ID:</label>
        <input type="number" value={userId} onChange={handleChange} required />

        <button type="submit">Send Email</button>
      </form>
      <button onClick={() => navigate("/admin-dashboard")}>Back</button>
    </div>
  );
};

export default SendEmailPage;
