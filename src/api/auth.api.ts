import { AxiosError } from "axios";

import { useAppProps } from "antd/es/app/context";
import { endpoints, POST } from "../utils/api.service";

import { ROUTES } from "../constants/routes";

// Login Request Interface
export interface LoginRequest {
  email: string;
  password: string;
}

// Login Response Interface
export interface LoginResponse {
  success: boolean;
  accessToken: string;
}

// PostLoginProps
interface PostLoginProps {
  accessToken: string;
}

/*
 Login user
*/
interface LoginProps extends LoginRequest {
  notification: useAppProps;
}

export const login = async ({ email, password, notification }: LoginProps) => {
  POST<LoginRequest, LoginResponse>(endpoints.auth.login, {
    email,
    password,
  })
    .then(({ data }) => {
      if (data?.success === true && data?.accessToken) {
        postLogin({
          accessToken: data?.accessToken,
        });
      }
    })
    .catch((error: AxiosError) => {
      notification?.notification.error({
        message: "Incorrect email or password!",
      });

      return error.response?.data;
    });
};

/*
 * Logout user
 */
export const logout = async () => {
  return postLogout();
};

/*
 * Utility functions
 */
export const postLogin = ({ accessToken }: PostLoginProps) => {
  // Save tokens to local storage
  localStorage.setItem("accessToken", accessToken);

  // Redirect to home page
  window.location.href = ROUTES.home;
};

export const postLogout = () => {
  // Remove tokens from local storage
  localStorage.clear();

  // Redirect to login
  window.location.href = ROUTES.login;
};
