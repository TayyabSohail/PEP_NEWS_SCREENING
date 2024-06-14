import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Login } from "./components/Login";

// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
