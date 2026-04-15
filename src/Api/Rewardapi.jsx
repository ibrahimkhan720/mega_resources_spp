import api from "../Api/RestApi";

export const getStaffProfile = async () => {
  const response = await api.get('/staff/profile');
  return response.data;
};

export const getreward = async () => {
  const response = await api.get('/rewards');
  return response.data;
};

export const claimReward = async (id, data = {}) => {
  const res = await api.post(`/rewards/${id}/claim`, data);
  return res.data;
};