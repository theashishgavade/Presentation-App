import React, { useState } from "react";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";
import './styles.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pass: "",
    role: "STUDENT",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.registerUser(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Error: " + error.response?.data || "Unable to register.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.header}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Password:</label>
          <input
            type="text"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <label style={styles.label}>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="STUDENT">STUDENT</option>
            <option value="ADMIN">ADMIN</option>
          </select>

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.registerText}>
          Already registered? <a href="/login" style={styles.registerLink}>Login</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '97vh',
    background: 'linear-gradient(45deg, #ff007f, #ff6b00, #00ff9d,rgb(255, 0, 208),rgb(133, 137, 14))', // Colorful gradient background
    backgroundSize: '400% 400%',
    animation: 'gradient 30s ease infinite', // Slowed down gradient animation
    fontFamily: 'Arial, sans-serif',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.1)', // Glassmorphism effect with semi-transparent background
    backdropFilter: 'blur(10px)', // Blurred background
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    zIndex: 1,
    position: 'relative',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '28px',
    color: '#fff',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  label: {
    fontSize: '16px',
    color: '#fff',
    // marginBottom: '2px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.5s',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.5s',
  },
  button: {
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.5s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  registerText: {
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '20px',
    color: '#fff',
  },
  registerLink: {
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

// Keyframes for the background gradient animation
const keyframes = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default RegisterPage;
