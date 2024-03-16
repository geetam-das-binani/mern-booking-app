import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import Protected from "../Protected/Protected";
import Login from "../pages/Login";
import Contact from "../components/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/register",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "/login",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/contact",
    element: <Protected />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Contact />,
          },
        ],
      },
    ],
  },
]);
