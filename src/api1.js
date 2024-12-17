import axios from 'axios';

const api1 = axios.create({
  baseURL: 'http://127.0.0.1:8001/api',
});

export default api1;
