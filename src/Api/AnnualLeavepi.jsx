import { api } from "@/Api/RestApi";

export const annualleave = async (data) => {
  try {
    const response = await api.post("/leave", data);
    return response.data;
  } catch (error) {
    console.error("Annual Leave API Error:", error);
    throw error;
  }
};