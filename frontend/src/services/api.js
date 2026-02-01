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

  // --- Facilitator / Upload Methods ---
  getSystemAlerts() {
    return apiClient.get('/facilitator/alerts');
  },
  
  // FIXED: Method for the branching upload workflow
  uploadResourceWithOptions(formData) {
    return apiClient.post('/resources/upload-with-options', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  uploadResource(formData) {
    return apiClient.post('/resources/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  saveGamifiedQuiz(quizData) {
    return apiClient.post('/quiz/save-gamified', quizData);
  }
};