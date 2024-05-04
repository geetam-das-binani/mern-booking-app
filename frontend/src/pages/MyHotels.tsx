import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";


const MyHotels = () => {
  const {
    data: hotelData,
    
  } = useQuery({
    queryKey: ["hotels"],
    queryFn: apiClient.getMyHotels,
  });

 

  if (!hotelData?.hotel?.length) {
    return <div>No Hotels Found</div>;
  }
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500"
          to={"/dashboard/add-hotel"}
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.hotel?.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-wrap">
              {hotel.desc}
              <div className="grid grid-cols-5 gap-2">
                <div className="border border-slate-300 p-3 flex items-center">
                  <i className="ri-map-2-line"></i>
                  {hotel.city},{hotel.country} 
                </div>
                <div className="border border-slate-300 p-3 flex items-center">
                  <i className="ri-building-line"></i>
                  {hotel.type}
                </div>
                <div className="border border-slate-300 p-3 flex items-center">
                  <i className="ri-money-dollar-circle-line"></i>
                  ₹{hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 p-3 flex items-center">
                  <i className="ri-hotel-line"></i>
                  {hotel.adultCount} adults,{hotel.childCount} children
                </div>
                <div className="border  border-slate-300 p-3 flex items-center">
                  <i className="ri-star-line"></i>
                 {" "}{hotel.starRating}{" "} Star Rating
                </div>
              </div>
            </div>
            <span className="flex justify-end">
              <Link className="flex bg-blue-600 text-white text-xl p-2 hover:bg-blue-500" to={`/dashboard/edit-hotel/${hotel._id}`}
              >View Details</Link>
            </span>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyHotels;
