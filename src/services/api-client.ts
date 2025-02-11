import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.weather.gov',
});

export default apiClient;
