import { api } from "../Api/RestApi";

export const getPolicies = async () => {
  const token = localStorage.getItem("token");  

  try {
    const res = await api.get("/policies" , {
        headers: {
         'X-Authorization': `${token}`
      }
    });

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};