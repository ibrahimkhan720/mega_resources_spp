

import { api } from "../Api/RestApi";

export const getjob = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const res = await api.get("/job/openings", {
      headers: {
          'X-Authorization': `${token}`
      },
    });

    return res.data;

  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};