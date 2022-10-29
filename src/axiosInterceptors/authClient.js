import axios from 'axios'
import Auth from '../auth'
import { EndpointConst } from '../constants'

const token = Auth.getToken()
const refreshToken = Auth.getRefreshToken()

const axiosInstance = axios.create({
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json'
  }
})

const createRequestInterceptor = () =>
  axiosInstance.interceptors.request.use((config) => {
    if (token && refreshToken && !config.url.includes('/api/auth/refresh-token')) {
      config.headers.Authorization = token
    }
    return config
  })

const createResponseInterceptor = () =>
  axiosInstance.interceptors.response.use((response) => response, errorHandler)

const errorHandler = (error) => {
  console.log(axios.interceptors.response)
  if (error.response.status !== 401) return Promise.reject(error)
  axios.interceptors.response.eject(createResponseInterceptor())
  return refreshAccessToken()
    .then((response) => {
      const { data = {} } = response.data
      Auth.setToken(data.token, data.refreshToken)
      error.response.config.headers.Authorization = data.token
      return axios(error.response.config)
    })
    .catch((error) => {
      Auth.removeToken()
      window.location = '/'
      return Promise.reject(error)
    })
    .finally(createResponseInterceptor())
}

const refreshAccessToken = async () => {
  const response = await axios.get(EndpointConst.AUTH.REFRESH_TOKEN, {
    headers: {
      Authorization: refreshToken
    }
  })
  return response
}

createRequestInterceptor()
createResponseInterceptor()

export default axiosInstance
