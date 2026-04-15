// import axios from "axios";

// export const api = axios.create({
//   baseURL: "https://spp.statelyweb.co.uk/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const getRequest = (url, params = {}) => {
//   return api.get(url, { params });
// };

// export const postRequest = (url, data) => {
//   return api.post(url, data);
// };

// export const putRequest = (url, data) => {
//   return api.put(url, data);
// };

// export const deleteRequest = (url) => {
//   return api.delete(url);
// };

// export default api;

import axios from "axios";

export const api = axios.create({
  baseURL: "https://spp.statelyweb.co.uk/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ⏱ prevents hanging requests
});

// ✅ Attach token automatically to EVERY request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["X-Authorization"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Global Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Optional helpers (you can keep or remove)
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