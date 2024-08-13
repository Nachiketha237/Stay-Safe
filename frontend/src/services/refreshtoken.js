import api from "../services/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";


export const refreshToken = async () => {
  const refresh_token = localStorage.getItem(REFRESH_TOKEN);
  try {
    const response = await api.post<{ access: string }>('/token/refresh/', { refresh: refresh_token });
    if (response.status === 200) {
      localStorage.setItem(ACCESS_TOKEN, response.data.access);
      console.log('Token refreshed');
    } else {
      console.error('Token refresh failed');
    }
  } catch (error) {
    console.error('Token refresh failed', error);
  }
};
