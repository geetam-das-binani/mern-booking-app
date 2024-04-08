import { useSelector } from "react-redux";
import { UserState } from "../types/types";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const Protected = ({
  children,
  adminOnly,
}: {
  children?: React.ReactNode;
  adminOnly?: boolean;
}) => {
  const { isAuthenticated, isLoggedIn, user } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );

  if (!isAuthenticated && !isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (adminOnly &&  !user?.isAdmin && isAuthenticated){
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};

export default Protected;
