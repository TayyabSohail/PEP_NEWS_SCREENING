import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { Layout } from "./layout";
import { Home } from "./pages/Home";
import { Preview } from "./pages/Preview";
import { Result } from "./pages/Result";
import { Details } from "./pages/Details";

import { Login } from "./pages/Login";

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
      {
        path: ROUTES.preview,
        element: <Preview />,
      },
      {
        path: ROUTES.result,
        element: <Result />,
      },
      {
        path: ROUTES.details,
        element: <Details />,
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
