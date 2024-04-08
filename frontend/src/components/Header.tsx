import { Link } from "react-router-dom";
import { UserState } from "../types/types";
import { useSelector } from "react-redux";

import SignOutButton from "./SignOutButton";
const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"#"}>MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isAuthenticated ? (
            <>
              <Link
                className="flex items-center text-white
              px-3 font-bold hover:bg-blue-600
              "
                to="/"
              >
                Home
              </Link>
              <Link
                className="flex items-center text-white
              px-3 font-bold hover:bg-blue-600
              "
                to="/my-bookings"
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white
              px-3 font-bold hover:bg-blue-600
              "
                to="/profile"
              >
                Profile
              </Link>
              {user?.isAdmin && (
                <>
                  {" "}
                  <Link
                    className="flex items-center text-white
               px-3 font-bold hover:bg-blue-600
               "
                    to="/my-hotels"
                  >
                    My Hotels
                  </Link>
                  <Link
                    className="flex items-center text-white
               px-3 font-bold hover:bg-blue-600
               "
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              className="bg-white flex items-center text-blue-600 
          px-3font-bold hover:bg-gray-100"
              to={"/login"}
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
