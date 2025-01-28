import axios from "axios";

// Set the base URL of your backend
const API_BASE_URL = "http://localhost:8080";

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const userService = {
  registerUser: (userData) => api.post("/user/register", userData),
  loginUser: (email, password) =>
    api.post("/user/login", null, {
      params: { email, password },
    }),
  logoutUser: (email) =>
    api.post("/user/logout", null, {
      params: { email },
    }),
  getStudentDetails: (userId) => api.get(`/user/student/${userId}`),
  getAdminDetails: (userId) => api.get(`/user/admin/${userId}`),
  getAllUsers: (adminId) => api.get(`/user/admin/${adminId}/all`),
  updateUserStatus: (adminId, userId, status) =>
    api.put(`/user/admin/${adminId}/status`, null, {
      params: { userId, status },
    }),
};

export const ratingService = {
  ratePresentation: (userId, presentationId, ratingData) =>
    api.put(`/rating/rate/userid/${userId}/presentationid/${presentationId}`, ratingData),
  getRatingsByPresentationId: (presentationId) =>
    api.get(`/rating/presentation/${presentationId}`),
  getRatingsByUserId: (userId) => api.get(`/rating/student/${userId}`),
};

export const presentationService = {
  assignPresentation: (userId, presentationData) =>
    api.post(`/presentation/admin/assign/${userId}`, presentationData),
  getPresentationById: (presentationId) =>
    api.get(`/presentation/id/${presentationId}`),
  getPresentationsByUserId: (userId) =>
    api.get(`/presentation/student/${userId}`),
  changePresentationStatus: (userId, presentationId, status) =>
    api.put(`/presentation/student/${userId}/status`, null, {
      params: { presentationId, status },
    }),
};
