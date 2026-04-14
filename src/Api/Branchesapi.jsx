import { api } from "../Api/RestApi";

export const getbranch = async () => {
   const token = localStorage.getItem('token');
  try {
    const res = await api.get("/branches", {
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