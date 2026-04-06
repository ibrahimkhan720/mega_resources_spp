import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRequest = (url, params = {}) => {
  return api.get(url, { params });
};

export const postRequest = (url, data) => {
  return api.post(url, data);
};

export const putRequest = (url, data) => {
  return api.put(url, data);
};

export const deleteRequest = (url) => {
  return api.delete(url);
};

export default api;