import { api } from "../Api/RestApi";

export const getjob = async () => {
  try {
    const res = await api.get("/job/openings");
    return res.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};