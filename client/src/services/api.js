import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
 
    withCredentials: true, // Ensures cookies are sent with requests
});

export default api;
