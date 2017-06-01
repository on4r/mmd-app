import axios from 'axios'

const API = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

const jwt = sessionStorage.getItem('jwt') || ''

if (jwt.length) {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}

export default API
