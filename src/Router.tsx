import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { Layout } from "./layout";
import { Home } from "./components/Home";

import { Login } from "./components/Login";

import { ROUTES } from "./constants/routes";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
