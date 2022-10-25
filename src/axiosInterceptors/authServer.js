import axios from 'axios'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default axios
