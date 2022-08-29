import { axiosObj } from "./Helper"

export const signup = (user) => {
  return axiosObj.post('/auth/register', user).then(response => response.data)
}

export const login = (user) => {
  return axiosObj.post('/auth/login', user).then(response => response.data)
}