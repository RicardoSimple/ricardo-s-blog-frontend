import { store, load } from './storage'

const loadUserInfoKey = "load-user-info"
const loadTokenKey = "load-token-info"
const loadRefreshTokenKey = "load-refresh-token-info"

export const getUserInfo = () => {
  return load(loadUserInfoKey, null)
}

export const setUserInfo = (userInfo) => {
  store(loadUserInfoKey, userInfo)
}
export const getToken = () => {
  return load(loadTokenKey, "")
}

export const setToken = (token) => {
  store(loadTokenKey, token)
}
export const getRefreshToken = () => {
  return load(loadRefreshTokenKey, "")
}

export const setRefreshToken = (token) => {
  store(loadRefreshTokenKey, token)
}