import { api } from "../Api/RestApi";

export const getStaffProfile = async () => {
    const token = localStorage.getItem('token'); 
    const response = await api.get('/staff/profile', {
        headers: { 
          'X-Authorization': `${token}`
        }
    }); 
    return response.data;
};

export const getreward = async () => {
     const token = localStorage.getItem('token'); 

    const response = await api.get('/rewards', {    
         headers: { 
          'X-Authorization': `${token}`
        }
    }); 
    return response.data;
};

export const claimReward = async (id, data, token) => {
  try {
    const res = await api.post(`/rewards/${id}/claim`, data, {
      headers: {
        'X-Authorization': `${token}`, 
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    throw error;
  }
};