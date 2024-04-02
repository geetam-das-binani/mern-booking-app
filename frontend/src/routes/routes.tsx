import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layout/Layout";
import Protected from "../Protected/Protected";
import Booking from "../pages/Booking";
import Error from "../error/Error";
const Register = lazy(() => import("../pages/Register"));
const Homepage = lazy(() => import("../pages/Homepage"));
const Login = lazy(() => import("../pages/Login"));
const AddHotel = lazy(() => import("../pages/AddHotel"));
const MyHotels = lazy(() => import("../pages/MyHotels"));
const EditHotel = lazy(() => import("../pages/EditHotel"));
const Search = lazy(() => import("../pages/Search"));
const Details = lazy(() => import("../pages/Details"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const Contact = lazy(() => import("../pages/Contact"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Homepage />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Search />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "detail/:hotelId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Details />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Register />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Contact />
          </Suspense>
        ),
        errorElement: <Error />,
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
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddHotel />
              </Suspense>
            ),
            errorElement: <Error />,
          },
          {
            path: "my-hotels",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <MyHotels />
              </Suspense>
            ),
            errorElement: <Error />,
          },
          {
            path: "edit-hotel/:hotelId",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditHotel />
              </Suspense>
            ),
            errorElement: <Error />,
          },
          {
            path: "hotel/:hotelId/booking",
            element: <Booking />,
            errorElement: <Error />,
          },
          {
            path: "my-bookings",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <MyBookings />
              </Suspense>
            ),
            errorElement: <Error />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Page Not Found</div>,
  },
]);
