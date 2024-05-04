import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../layout/Layout";
import Protected from "../Protected/Protected";
import Booking from "../pages/Booking";
import Error from "../error/Error";
import DashboardOrderDetails from "../Admin/DashboardOrderDetails";

const AddHotel = lazy(() => import("../pages/AddHotel"));
const Register = lazy(() => import("../pages/Register"));
const Homepage = lazy(() => import("../pages/Homepage"));
const Login = lazy(() => import("../pages/Login"));
const MyHotels = lazy(() => import("../pages/MyHotels"));
const EditHotel = lazy(() => import("../pages/EditHotel"));
const Search = lazy(() => import("../pages/Search"));
const Details = lazy(() => import("../pages/Details"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const Contact = lazy(() => import("../pages/Contact"));
const Profile = lazy(() => import("../pages/Profile"));
const UpdateProfile = lazy(() => import("../pages/UpdateProfile"));
const DashBoardData = lazy(() => import("../Admin/DashBoardData"));
const DashboardUsers = lazy(() => import("../Admin/DashBoardUsers"));
const DashboardReviews = lazy(() => import("../Admin/DashBoardReviews"));
const DashboardHotels = lazy(() => import("../Admin/DashboardHotels"));
const DashboardOrders= lazy(() => import("../Admin/DashboardOrders"));

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
  // !Protected Routes for logged in users
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            ),
            errorElement: <Error />
          },
          {
            path: "update",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <UpdateProfile />
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
            errorElement: <Error />
          },
          
          {
            path: "hotel/:hotelId/booking",
            element: <Booking />,
            errorElement: <Error />
          },
          {
            path: "my-bookings",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <MyBookings />
              </Suspense>
            ),
            errorElement: <Error />
          },
        ],
      },
    ],
  },

  // !Admin Routes Protected
  {
    path: "/",
    element: <Protected adminOnly={true} />,
    children: [
      {
        path: "",
        element: <Layout />,
        children: [
          {
            path: "dashboard",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashBoardData />
              </Suspense>
            ),
            errorElement: <Error />
          },
         
          {
            path: "dashboard/add-hotel",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <AddHotel />
              </Suspense>
            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/edit-hotel/:hotelId",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditHotel />
              </Suspense>
            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/users",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardUsers />
              </Suspense>
            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/reviews",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardReviews />
              </Suspense>
            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/hotels",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardHotels />
              </Suspense>

            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/orders",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardOrders/>
              </Suspense>

            ),
            errorElement: <Error />
          },
          {
            path: "dashboard/booking/detail/:hotelId/:bookingId",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <DashboardOrderDetails/>
              </Suspense>

            ),
            errorElement: <Error />
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div>Page Not Found</div>
  }
]);
