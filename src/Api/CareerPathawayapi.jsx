import { api } from "../Api/RestApi";

export const getcareer = async () => {
   const token = localStorage.getItem('token');
  try {
    const res = await api.get("/career/pathways", {
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