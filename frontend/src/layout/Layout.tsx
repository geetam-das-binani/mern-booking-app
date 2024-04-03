import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { UserState } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast";
import { Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { loadUser } from "../api-client";
import { loggedInUser } from "../reducers/userReducer";
import { useEffect } from "react";
import { logout as logoutUser } from "../reducers/userReducer";
import SearchBar from "../components/SearchBar";



const Layout = () => {
  const { toastMessageDetails } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );

  const dispatch = useDispatch();
  const { isError, isSuccess, data } = useQuery({
    queryFn: loadUser,
    queryKey: ["validate"],
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedInUser(data?.userWithoutPassword));
    }
    if (isError) {
      dispatch(logoutUser());
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Hero />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">
        <Outlet  />
      </div>
      <Footer />
      {toastMessageDetails && (
        <Toast
          message={toastMessageDetails.message}
          type={toastMessageDetails.type}
        />
      )}
    </div>
  );
};

export default Layout;
