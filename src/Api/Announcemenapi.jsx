import { api } from "../Api/RestApi";

export const getannouncement = async () => {
   const token = localStorage.getItem('token');
  try {
    const res = await api.get("/announcement", {
       headers: {
         'X-Authorization': `${token}`
      }
    });
    return res.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};