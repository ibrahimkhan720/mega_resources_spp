import { api } from "../Api/RestApi";

export const getpoints = async () => {
   const token = localStorage.getItem('token');
  try {
    const res = await api.get("/point/rule", {
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