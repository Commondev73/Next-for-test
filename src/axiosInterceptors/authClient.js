import axios from 'axios'
import Auth from '../auth'
import Services from '../services'
import jwtDecode from 'jwt-decode'

axios.interceptors.request.use(
  (config) => {
    const token = Auth.getToken()
    const refreshToken = Auth.getRefreshToken()
    if (token && refreshToken && !config.url.includes('/api/auth/refresh-token')) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error)
    const { status } = error.response
    const token = Auth.getToken()
    const refreshToken = Auth.getRefreshToken()
    if (token && refreshToken) {
      const { exp: refreshTokenExp } = jwtDecode(refreshToken)
      const now = new Date().getTime() / 1000
      if (status === 401 && refreshTokenExp > now) {
        const result = await Services.AuthService.refreshToken(refreshToken)
        const { statusCode, data } = result.data
        if (statusCode === 200) {
          Auth.setToken(data.token, data.refreshToken)
          error.config.headers.Authorization = data.token
          return axios(error.config)
        }
        Auth.removeToken()
        window.location = '/login'
      }
      if (refreshTokenExp < now) {
        Auth.removeToken()
        window.location = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axios
