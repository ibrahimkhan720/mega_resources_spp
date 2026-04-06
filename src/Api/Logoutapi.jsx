import { api } from "../Api/RestApi";

export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");  
    console.log(token);
    const res = await api.post("/staff/logout", {}, {
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log("Logout API Error:", error.response?.data);
    throw error;
  }
};