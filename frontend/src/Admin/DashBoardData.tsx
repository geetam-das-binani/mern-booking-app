import { useQuery } from "@tanstack/react-query";
import Dashboard from "./Dashboard";
import * as apiClient from "../api-client";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { FaHouseCircleExclamation } from "react-icons/fa6";
const DashBoardData = () => {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: apiClient.gettDashBoardData,
  });



  
  return (
    <div className="p-3">
      <h2 className="text-2xl mb-2 text-center font-semibold  ">Statistics</h2>

      <div
        className="grid
      w-[70%]
      grid-cols-1 md:grid-cols-2  mx-auto  gap-3"
      >
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-fuchsia-200 text-black   shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.users?.length > 5 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Users
            </div>
            <div className="flex flex-col justify-between ">
              {data?.users?.length} <IoMdPeople className="mt-3 text-xl" />
            </div>
          </div>

          <hr className="mt-2 mb-1 border border-black w-full" />

          <Link
            to={"/dashboard/users"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className=" hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-yellow-200 text-black  shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.bookings?.length >= 3 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Bookings
            </div>
            <div className="flex flex-col justify-between ">
              {data?.bookings?.length}
              <TbTruckDelivery className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/orders"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-orange-200 text-black  shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.reviews?.length >= 8 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}{" "}
              Reviews
            </div>
            <div className="flex flex-col justify-between ">
              {data?.reviews?.length}{" "}
              <BsFillHouseDoorFill className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/reviews"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
        <div className="hover:scale-[110%] duration-300 p-2 border border-slate-300 rounded-md md:w-[250px] w-[400px]  h-[110px] bg-sky-200 text-black   shadow-lg ">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data?.hotels?.length >= 5 ? (
                <FaArrowUp color="green" />
              ) : (
                <FaArrowDown color="red" />
              )}
              Hotels
            </div>
            <div className="flex flex-col justify-between ">
              {data?.hotels?.length}{" "}
              <FaHouseCircleExclamation className="mt-3 text-2xl" />
            </div>
          </div>
          <hr className="mt-2 mb-1 border border-black w-full" />
          <Link
            to={"/dashboard/hotels"}
            className="text-blue-600 cursor-pointer underline font-semibold text-xs flex justify-end "
          >
            View All
          </Link>
        </div>
      </div>
      <div className="bg-blue-200 w-fit md:w-[50%] mx-auto p-2 text-center  rounded-md m-4 font-semibold text-black duration-300 hover:bg-blue-300">
        Total Amount Earned: ₹{" "}
        {data?.bookings?.reduce(
          (acc: any, booking: any) => acc + booking.totalPrice,
          0
        )}
      </div>
    </div>
  );
};

export default Dashboard(DashBoardData);
