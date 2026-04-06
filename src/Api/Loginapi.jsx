import { api } from "../Api/RestApi";

export const loginUser = async (data) => {
  try {
    const res = await  api.post("/staff/login", data);
    return res.data;
  } catch (error) {
    console.log("Login Error:", error.response?.data);
    throw error;
  }
};