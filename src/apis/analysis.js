import axios from 'axios';

const analysisInstance = axios.create({
  baseURL: import.meta.env.VITE_AI_API_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
});

analysisInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

analysisInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error.response);
  },
);

export const uploadDatas = (formData) => {
  console.log('formData : ', formData);
  console.log('전송 시도');
  return analysisInstance.post('/predict', formData);
};

export const getAnalysisResult = (id) => {
  return analysisInstance.get(`/predict/${id}`);
};
