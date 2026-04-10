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
    const response = await api.get('/rewards', {    
    }); 
    return response.data;
};