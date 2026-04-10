import { api } from "../Api/RestApi";

export const getcareer = async () => {
  try {
    const res = await api.get("/career/pathways");
    return res.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};