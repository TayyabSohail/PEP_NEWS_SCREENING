import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { Layout } from "./layout";
import { Home } from "./pages/Home";

import { Login } from "./pages/Login";

import { ROUTES } from "./constants/routes";
import { Result } from "./pages/Result";

// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => redirect(ROUTES.home),
      },
      {
        path: ROUTES.home,
        element: <Home />,
      },
      {
        path: ROUTES.result,
        element: <Result />,
      },
    ],
  },
  {
    path: ROUTES.login,
    element: <Login />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
