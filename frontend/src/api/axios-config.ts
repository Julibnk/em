// import { axiosClient } from "./mock/mock";
import axios, { AxiosRequestConfig } from 'axios';

const axiosClient = axios.create();

// Interceptor send
axiosClient.interceptors.request.use((request) => {
  //   const token = getLocalStorageCognitoIdToken();
  //   token && (request.headers["Authorization"] = `Bearer ${token}`);
  return request;
});

// Interceptor response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    throw error;
  }
);

export function getRequest(URL: string, config?: AxiosRequestConfig) {
  return axiosClient.get(URL, config).then((response) => response);
}

export function postRequest(
  URL: string,
  payload: any,
  config?: AxiosRequestConfig
) {
  return axiosClient.post(URL, payload, config).then((response) => response);
}

export function putRequest(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig
) {
  return axiosClient.put(URL, payload, config).then((response) => response);
}

export function deleteRequest(URL: string, config?: AxiosRequestConfig) {
  return axiosClient.delete(URL, config).then((response) => response);
}
