import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import RegisterPage from './components/pages/User/RegisterPage';
import LoginPage from './components/pages/User/LoginPage';
import StudentDashboard from './components/pages/User/StudentDashboard';
import AdminDashboard from './components/pages/User/AdminDashboard';
import AssignPresentationPage from './components/pages/Presentation/AssignPresentationPage';
import UpdatePresentationStatusPage from './components/pages/Presentation/UpdatePresentationStatusPage';
import ChangeStatusPresentationPage from './components/pages/Presentation/ChangeStatusPresentationPage';
import RatePresentationPage from './components/pages/Rating/RatePresentationPage';
import ChangeStatusUserPage from './components/pages/ChangeStatusUserPage';

function App() {
  return (
    // <Router>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/assign-presentation" element={<AssignPresentationPage />} />
          <Route path="/update-presentation-status" element={<UpdatePresentationStatusPage />} />
          <Route path="/change-status-presentation" element={<ChangeStatusPresentationPage />} />
          <Route path="/rate-presentation" element={<RatePresentationPage />} />
          <Route path="/change-status-user" element={<ChangeStatusUserPage />} />
          {/* You can add more routes here */}
        </Routes>
      </BrowserRouter >
    </div>
    // </Router>
  );
}

export default App;




