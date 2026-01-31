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

  // --- Admin/Facilitator Methods (CRUD) ---
  // Modules
  createModule(moduleData) {
    return apiClient.post('/admin/modules', moduleData);
  },
  
  // Quizzes
  addQuizQuestion(quizData) {
    return apiClient.post('/admin/quizzes', quizData);
  },
  updateQuizQuestion(id, quizData) {
    return apiClient.put(`/admin/quizzes/${id}`, quizData);
  },
  deleteQuizQuestion(id) {
    return apiClient.delete(`/admin/quizzes/${id}`);
  },

  // Resources
  addResource(resourceData) {
    return apiClient.post('/admin/resources', resourceData);
  },
  deleteResource(id) {
    return apiClient.delete(`/admin/resources/${id}`);
  },

  // Alerts & Reports
  getSystemAlerts() {
    return apiClient.get('/facilitator/alerts');
  },
  getImpactReports() {
    return apiClient.get('/researcher/reports');
  }
};