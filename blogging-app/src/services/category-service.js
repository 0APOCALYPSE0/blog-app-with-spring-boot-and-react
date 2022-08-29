import { axiosObj } from "./Helper"

export const getCategories = () => {
  return axiosObj.get('/categories').then(response => response.data)
}