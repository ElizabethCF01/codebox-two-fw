import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { StrapiErrorResponse } from "../interfaces/error";
import type { StrapiLoginResponse } from "../interfaces/user";
import axiosClient from "../lib/axios";
import { useAuthStore } from "../stores/auth";

export const useLogin = () => {
  const navigate = useNavigate();
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosClient.post<StrapiLoginResponse>(
        "auth/local",
        {
          identifier: email,
          password: password,
        },
      );

      if (response) {
        toast.success("Welcome back !");
        navigate("/");
        useAuthStore.getState().setUser(response.data.user);
        useAuthStore.getState().setJwt(response.data.jwt);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error
          ?.message || "Some Error occurred try again!",
      );
    }
  };
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await axiosClient.post<StrapiLoginResponse>(
        "auth/local/register",
        {
          username: username,
          email: email,
          password: password,
        },
      );

      if (response) {
        toast.success("Successfully registerd !");
        navigate("/");
        useAuthStore.getState().setUser(response.data.user);
        useAuthStore.getState().setJwt(response.data.jwt);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        (error as AxiosError<StrapiErrorResponse>).response?.data?.error
          ?.message || "Some Error occurred try again!",
      );
    }
  };
  return { register, login };
};
