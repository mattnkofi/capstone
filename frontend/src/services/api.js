import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

export default {
  // Fetches the gamified path coordinates and status from MySQL
  getLearningPath(userId) {
    return apiClient.get(`/learner/path/${userId}`);
  },
  // Records real-time stress data for AI behavioral pattern detection
  saveStressLog(data) {
    return apiClient.post('/wellness/stress', data);
  },
  // Retrieves live AI-generated risk alerts for facilitators
  getSystemAlerts() {
    return apiClient.get('/facilitator/alerts');
  },
  // Fetches aggregated impact reports for the Researcher role
  getImpactReports() {
    return apiClient.get('/researcher/reports');
  }
};