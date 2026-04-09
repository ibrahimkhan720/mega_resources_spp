import { api } from "../Api/RestApi";

export const getorganisational = async () => {
  try {
    const res = await api.get("/organisational/chart");
    return res.data; // Yeh pura object return karega { stats: [], ceo: {}, ... }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
