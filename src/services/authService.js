import axios from 'axios'
import { AuthClient, AuthServer } from '../axiosInterceptors'
import { EndpointConst } from '../constants'

const signUp = async (payload) => {
  return await AuthClient.post(EndpointConst.AUTH.SIGN_UP, payload)
}

const signIn = async (payload) => {
  return await axios.post(EndpointConst.AUTH.SIGN_IN, payload)
}

const refreshToken = async (refreshToken) => {
  return await AuthClient.get(EndpointConst.AUTH.REFRESH_TOKEN, {
    headers: {
      Authorization: refreshToken
    }
  })
}

const getProfile = async (options) => {
  return await AuthServer.get(EndpointConst.AUTH.GET_PROFILE, options)
}

const updateProfile = async (payload) => {
  return await AuthClient.post(EndpointConst.AUTH.UPDATE_PROFILE, payload)
}

module.exports = { signUp, signIn, refreshToken, getProfile, updateProfile }
