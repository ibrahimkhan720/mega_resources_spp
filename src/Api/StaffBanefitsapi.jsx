import { api } from "../Api/RestApi";

export const getstaff = async () => {
  try {
    const res = await api.get("/staff/benefits");
    return res.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};