import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const endpoints = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
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
