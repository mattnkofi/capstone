import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },
  getLearningPath(userId) {
    return apiClient.get(`/learner/path/${userId}`);
  },
  getResources() {
    return apiClient.get('/resources');
  },
  uploadResourceWithOptions(formData) {
    return apiClient.post('/resources/upload-with-options', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  saveGamifiedQuiz(quizData) {
    return apiClient.post('/quiz/save-gamified', quizData);
  }
};