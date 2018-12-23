import axios from 'axios'
import get from 'lodash/get'

const axiosInstance = axios.create({
  timeout: 5000
})

// unwrap the success/error responses so we don't have to do it manually each time
axiosInstance.interceptors.response.use(function (response) {
  const apiResponse = response.data ? response.data : response
  return apiResponse
}, function (error) {
  const apiError = get(error, 'response.data', error)
  return Promise.reject(apiError)
})

axiosInstance.setToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

axiosInstance.clearToken = () => {
  axiosInstance.defaults.headers.common['Authorization'] = undefined
}

export default axiosInstance
