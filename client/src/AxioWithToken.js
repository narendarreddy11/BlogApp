import axios from 'axios';

export const AxioWithtoken = axios.create({
  baseURL: 'http://localhost:4000', // optional, you can remove if not needed
});

// 🔁 Attach latest token before every request
AxioWithtoken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No token found. Please log in again.');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
