import Cookies from 'js-cookie'

const Auth = {
  settoken: (token, refreshToken) => {
    Cookies.set('token', token)
    Cookies.set('refreshToken', refreshToken)
  },
  gettoken: () => {
    return Cookies.get('token') || ''
  },
  getrefreshToken: () => {
    return Cookies.get('refreshToken') || ''
  },
  removetoken: () => {
    Cookies.remove('token')
    Cookies.remove('refreshToken')
  }
}

export default Auth
