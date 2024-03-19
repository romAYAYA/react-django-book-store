import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const response = await axiosInstance.post('/token/refresh', {
          refresh: Cookies.get('refresh_token'),
        })
        const newAccessToken = response.data.access
        const newRefreshToken = response.data.refresh

        Cookies.set('access_token', newAccessToken, { path: '/' })
        Cookies.set('refresh_token', newRefreshToken, { path: '/' })

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
