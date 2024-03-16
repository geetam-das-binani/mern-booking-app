import { useSelector } from "react-redux";
import { UserState } from "../types/types";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const Protected = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated, isLoggedIn } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );

  if (!isAuthenticated && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
