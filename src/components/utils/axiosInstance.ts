import axios from 'axios';

import AppConfig from '@/configs/AppConfig';

import { ACCESS_TOKEN_KEY } from '../constants';

const axiosInstance = axios.create({
  baseURL: AppConfig.BASE_API_URL,
  timeout: 15000,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

export default axiosInstance;
