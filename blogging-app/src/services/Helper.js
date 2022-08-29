import axios from "axios";
import { getToken } from "../auth";

export const BASE_URL = "http://localhost:8080/api/v1";
export const axiosObj = axios.create({
  baseURL: BASE_URL
});

export const privateAxiosObj = axios.create({
  baseURL: BASE_URL
});

privateAxiosObj.interceptors.request.use(config => {
  const token = getToken();
  if(token){
    config.headers.common.Authorization = "Bearer "+token;
    return config;
  }
},
error => Promise.reject(error));