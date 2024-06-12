import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
