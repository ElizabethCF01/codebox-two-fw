import { useAuthStore } from "../stores/auth";
import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const authStore = useAuthStore.getState();
      const accessToken = authStore.jwt;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error(error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
