import { api } from "@/Api/RestApi";

export const mileage = async (data) => {
  const token = localStorage.getItem('token');

  try {
    const response = await api.post("/mileage-claims", data, {
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