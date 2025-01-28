import axios from "axios";

const BASE_URL = "http://localhost:8080/presentation";

const PresentationService = {
  assignPresentation: async (userId, presentationData) => {
    const response = await axios.post(`${BASE_URL}/admin/assign/${userId}`, presentationData);
    return response.data;
  },

  getPresentationById: async (presentationId) => {
    const response = await axios.get(`${BASE_URL}/id/${presentationId}`);
    return response.data;
  },

  getPresentationsByUserId: async (userId) => {
    const response = await axios.get(`${BASE_URL}/student/${userId}`);
    return response.data;
  },

  changePresentationStatus: async (userId, presentationId, status) => {
    const response = await axios.put(
      `${BASE_URL}/student/${userId}/status`,
      null,
      {
        params: { presentationId, status },
      }
    );
    return response.data;
  },
};

export default PresentationService;
