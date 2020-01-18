import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.28.108:3333'
});

export default api;