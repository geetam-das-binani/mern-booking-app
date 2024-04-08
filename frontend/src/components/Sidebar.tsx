import { Link } from "react-router-dom";
import linksArray from "../config/links.config";

const Sidebar = () => {
  return (
    <div className=" border-r-2">
      <div className="sidebar   lg:left-0 p-2 overflow-y-auto text-center bg-white-600">
        <div className="text-gray-100 text-xl">
          <Link to={"/dashboard"} className="
          cursor-pointer
          p-2.5 mt-1 flex items-center">
            <i className="ri-dashboard-fill px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-black  text-[15px] ml-3">
              Dashboard
            </h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
          </Link>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        {linksArray.slice(0, 2).map((elem) => (
          <Link
            key={elem.name}
            to={elem.url}
            className="p-2.5 mt-3 flex items-center rounded-md px-4 
            duration-300 cursor-pointer hover:bg-blue-600
            
            hover:text-white "
          >
            <i className={`${elem.icon} px-2 py-1 rounded-md text-2xl `}></i>
            <span className="text-[15px]  ml-4 font-bold ">{elem.name}</span>
          </Link>
        ))}

        <div className="my-2 bg-gray-500 h-[1px]"></div>
        <Link to={"/dashboard/users"}
          className="p-2.5 mt-3 flex 
        items-center rounded-md px-4 duration-300
         cursor-pointer hover:bg-blue-600 text-black  hover:text-white "
        >
          <i className="ri-team-fill"></i>
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 font-bold">Users</span>
          </div>
        </Link>
        <div
          className="text-left text-sm mt-2 w-4/5 mx-auto font-bold
       
        "
        >
          <Link to={"/dashboard/reviews"} className="block w-full text-black cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1 hover:text-white">
            <i className="ri-chat-4-fill mr-2"></i>
            <span>Reviews</span>
          </Link>
          <h1
            className="cursor-pointer p-2 hover:text-white
         hover:bg-blue-600 rounded-md mt-1"
          >
            <i className="ri-line-chart-fill mr-2 "></i>
            <span >Stats</span>
          </h1>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 hover:text-white text-black">
          <i className="ri-logout-box-fill text-2xl "></i>
          <span className="text-[15px] ml-4  font-bold">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
