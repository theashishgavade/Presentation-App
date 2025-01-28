import axios from "axios";

const BASE_URL = "http://localhost:8080/rating";

const RatingService = {
  ratePresentation: async (userId, presentationId, ratingData) => {
    const response = await axios.put(`${BASE_URL}/rate/userid/${userId}/presentationid/${presentationId}`, ratingData);
    return response.data;
  },

  getRatingsByPresentationId: async (presentationId) => {
    const response = await axios.get(`${BASE_URL}/presentation/${presentationId}`);
    const [firstObject] = response.data; // destructure the first object from the array
    return firstObject;
  }
  ,

  getOverallRatingsByUserId: async (userId) => {
    const response = await axios.get(`${BASE_URL}/student/${userId}`);
    return response.data;
  },

  getCompletedPresentationsWithRatings: async (userId) => {
    const response = await axios.get(`${BASE_URL}/completed/student/${userId}`);
    return response.data;
  },

  sendRatingsToUser: async (userId) => {
    const response = await axios.get(`${BASE_URL}/completed/student/${userId}`);
    return response.data;
  },

};

export default RatingService;
