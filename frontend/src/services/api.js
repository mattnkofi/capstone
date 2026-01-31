import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

export default {
  getLearningPath(userId) {
    return apiClient.get(`/learner/path/${userId}`);
  },
  getAdaptiveStatus(userId) {
    return apiClient.get(`/adaptive/status/${userId}`);
  },
  logStress(data) {
    return apiClient.post('/wellness/stress', data);
  }
};