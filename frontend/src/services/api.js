import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Matches your backend port
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  // Authentication
  login(credentials) {
    return apiClient.post('/login', credentials);
  },
  // Gamification Data
  getLearningPath(userId) {
    return apiClient.get(`/learner/path/${userId}`);
  },
  // Wellness Data (Panel Suggestion)
  logStress(data) {
    return apiClient.post('/wellness/stress', data);
  },
  // AI Alerts (Educator View)
  getRiskAlerts() {
    return apiClient.get('/facilitator/alerts');
  }
};