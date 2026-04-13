import { api } from "../Api/RestApi";

export const getstaff = async () => {
   const token = localStorage.getItem('token'); 
  try {
    const res = await api.get("/staff/benefits" , {
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