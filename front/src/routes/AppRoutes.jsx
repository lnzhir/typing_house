import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Product from "../pages/Product";
import History from "../pages/user/History";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/layouts/Layout";
import LayoutUser from "../pages/layouts/LayoutUser";
import HomeUser from "../pages/user/HomeUser";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "product/:id", element: <Product/>}
    ],
  },

  {
    path: "/user",
    element: <LayoutUser />,
    children: [
      { index: true, element: <HomeUser /> },
      { path: "history", element: <History /> },
    ],
  },
]);

const AppRoutes = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoutes;
