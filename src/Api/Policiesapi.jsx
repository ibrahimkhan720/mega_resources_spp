import { api } from "../Api/RestApi";

export const getPolicies = async () => {
  try {
    const res = await api.get("/policies");

    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};