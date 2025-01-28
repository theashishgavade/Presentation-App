const ReportService = {
  generateAndSendProgressReport: async (userId) => {
    const response = await axios.get(`http://localhost:8080/rating/completed/student/${userId}`);
    return response.data;
  },
};

export default ReportService;
