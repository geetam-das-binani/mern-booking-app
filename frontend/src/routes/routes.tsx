import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import Protected from "../Protected/Protected";
import Login from "../pages/Login";
import Contact from "../components/Contact";
import AddHotel from "../pages/AddHotel";
import MyHotels from "../pages/MyHotels";
import EditHotel from "../pages/EditHotel";
import Search from "../pages/Search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path:"search",
        element:<Search />
      },{
        path:"detail/:hotelId",
        element:<h1>detail</h1>
      }
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
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "add-hotel",
            element: <AddHotel />,
          },
          {
            path:"my-hotels",
            element:<MyHotels/>
          },{
            path:"edit-hotel/:hotelId",
            element:<EditHotel/>
          }
        ],
      },
    ],
  },
]);
