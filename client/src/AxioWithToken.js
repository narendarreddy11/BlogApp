import axios from 'axios';
import { API } from './components/config';
export const AxioWithtoken = axios.create({
  baseURL: `${API}`, // optional, you can remove if not needed
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
