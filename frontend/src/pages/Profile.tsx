import { useSelector } from "react-redux";
import { UserState } from "../types/types";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector(
    (state: { authUser: UserState }) => state.authUser.user
  );
  return (
    <div className="flex  flex-col items-center justify-center">
      <div className=" bg-blue-500  ">
        <div className="flex justify-center px-5  -mt-12">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full"
            src={user?.avatar}
            alt={user?.firstName}
          />
        </div>
        <div>
          <div className="text-center px-14">
            <h2 className="text-gray-800 text-3xl font-bold">{user?.email}</h2>

            <p className="mt-2 text-gray-500 text-sm"> </p>
          </div>
          <hr className="mt-6" />
          <div className="flex  bg-gray-50 ">
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                <span className="font-bold">Joined On </span> 
                <p>{user?.createdAt ? new Date(user.createdAt).toDateString() : 'N/A'}</p>
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-bold">FirstName </span> 
                <p>{user?.firstName}</p>
                
              </p>
            </div>
            <div className="border"></div>
            <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
              <p>
                {" "}
                <span className="font-bold">LastName </span> 
                <p>{user?.lastName}</p>
              </p>
            </div>
          </div>
        </div>
    
      </div>
      <Link to="/update" className="bg-blue-500 mt-2 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">Want to Update ?</Link>
    </div>
   
  );
};


export default Profile;
