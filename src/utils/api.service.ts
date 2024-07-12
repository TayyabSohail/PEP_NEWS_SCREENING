import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";

import { ROUTES } from "../constants/routes";
import { postLogout } from "../api/auth.api";

export const endpoints = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
  },
  result: {
    cacheKey: ["results"],
    url: "/userEnd/inputRec/saveUserRec",
  },
};

const apiService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});

export const GET = <Response>(url: string) => apiService.get<Response>(url);

export const PUT = <Request, Response>(url: string, body: Request) =>
  apiService.put<Request, AxiosResponse<Response>, Request>(url, body);

export const POST = <Request, Response>(
  url: string,
  body: Request,
  config?: AxiosRequestConfig
) =>
  apiService.post<Request, AxiosResponse<Response>, Request>(url, body, config);

export const PATCH = <Request, Response>(url: string, body: Request) =>
  apiService.patch<Request, AxiosResponse<Response>, Request>(url, body);

export const DELETE = <Response>(url: string) =>
  apiService.delete<Response>(url);

apiService.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (
      (!window.location.href.includes(ROUTES.login) &&
        error.response?.status === 401) ||
      error.response?.status === 403 ||
      error.response?.status === 406
    ) {
      await postLogout();
    }

    return Promise.reject(error);
  }
);
