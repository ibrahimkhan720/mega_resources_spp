

import { api } from "../Api/RestApi";

export const getjob = async () => {
  try {
    const token = localStorage.getItem("token");

    // 🔍 Debug (check token aa raha hai ya nahi)
    console.log("TOKEN:", token);

    const res = await api.get("/job/openings", {
      headers: {
          'X-Authorization': `${token}`
      },
    });

    return res.data;

  } catch (error) {
    // 🔴 Proper error handling
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};