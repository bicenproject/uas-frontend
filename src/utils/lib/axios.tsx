 import axios from 'axios';  

const axiosInstance = axios.create({  
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',  
});  

axiosInstance.interceptors.request.use((config) => {  
  const token = localStorage.getItem('access_token');  
  if (token) {  
    config.headers.Authorization = `Bearer ${token}`;  
  }  
  return config;  
});  

axiosInstance.interceptors.response.use(  
  (response) => response,  
  async (error) => {  
    const originalRequest = error.config;  

    if (error.response?.status === 401 && !originalRequest._retry) {  
      originalRequest._retry = true;  

      try {  
        const refreshToken = localStorage.getItem('refresh_token');  
        const response = await axios.get(  
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,  
          {  
            headers: {  
              Authorization: `Bearer ${refreshToken}`,  
            },  
          }  
        );  

         const { access_token, refresh_token } = response.data.result;  
        localStorage.setItem('access_token', access_token);  
        localStorage.setItem('refresh_token', refresh_token);  

        return axiosInstance(originalRequest);  
      } catch (err) {  
        localStorage.removeItem('access_token');  
        localStorage.removeItem('refresh_token');  
        window.location.href = '/auth/sign-in';  
      }  
    }  

    return Promise.reject(error);  
  }  
);  

export default axiosInstance;