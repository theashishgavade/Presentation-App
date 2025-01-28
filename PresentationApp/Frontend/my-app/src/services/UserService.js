import axios from "axios";

const BASE_URL = "http://localhost:8080/user";

const UserService = {
  registerUser: async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post(`${BASE_URL}/login`, null, {
      params: { email, password },
    });
    return response.data;
  },

  logout: async (userId) => {
    const response = await axios.post(`${BASE_URL}/logout`, null, {
      params: { userId },
    });
    return response.data;
  },

  getStudentById: async (userId) => {
    const response = await axios.get(`${BASE_URL}/student/${userId}`);
    return response.data;
  },

  getAdminById: async (userId) => {
    const response = await axios.get(`${BASE_URL}/admin/${userId}`);
    return response.data;
  },

  getAllUsers: async (adminId) => {
    const response = await axios.get(`${BASE_URL}/admin/${adminId}/all`);
    return response.data;
  },

  updateUserStatus: async (userId, status) => {
    const response = await axios.put(`${BASE_URL}/admin/1/status`, null, {
      params: { userId, status },
    });
    return response.data;
  },
};

export default UserService;
