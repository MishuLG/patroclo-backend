const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', 
  headers: {
    'Content-Type': 'application/json'
  }
});

module.exports = apiClient;