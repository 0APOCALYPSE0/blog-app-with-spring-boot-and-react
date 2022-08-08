import { axiosObj } from "./Helper"

export const signup = (user) => {
  return axiosObj.post('/api/v1/auth/register', user).then(response => response.data)
}

export const login = (user) => {
  return axiosObj.post('/api/v1/auth/login', user).then(response => response.data)
}