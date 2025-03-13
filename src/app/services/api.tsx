import axios from 'axios';
 
const api = axios.create({
  baseURL: 'https://localhost:7269/api/',
  //baseURL: 'http://192.168.2.100:7090/api/',
  // Other configurations like headers can be added here
});
 
// Add a request interceptor to include the token in each request
api.interceptors.request.use(
  config => {
    let token = null;
 
    // Ensure this code only runs in the browser environment
    if (typeof window !== "undefined") {
      token = localStorage.getItem('token');
    }
 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
 
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
 
export default api;
 
 