import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

export default {
  // --- Learner Methods ---
  getLearningPath(userId) {
    return apiClient.get(`/learner/path/${userId}`);
  },
  saveStressLog(data) {
    return apiClient.post('/wellness/stress', data);
  },
  getModuleQuiz(moduleId) {
    return apiClient.get(`/learner/quiz/${moduleId}`);
  },
  getResources() {
    return apiClient.get('/resources');
  },

  // --- Facilitator Methods ---
  getSystemAlerts() {
    return apiClient.get('/facilitator/alerts');
  },
  
  uploadResource(formData) {
    return apiClient.post('/resources/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};