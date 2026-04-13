import { api } from "@/Api/RestApi";

export const annualleave = async (data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post("/leave", data, {
      headers: {
       'X-Authorization': `${token}`
      }
    });

    return response.data;

  } catch (error) {
    console.error("Annual Leave API Error:", error);
    throw error;
  }
};