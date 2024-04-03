import { Link } from "react-router-dom";
import {  HotelType } from "../types/types";

type EachHotel = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }:  EachHotel ) => {
  return <Link className="relative cursor-pointer overflow-hidden rounded-md" to={`/detail/${hotel._id}`}>
       <div className="h-[300px]">
        <img className="w-full h-full object-cover object-center" src={hotel.imageUrls[0]} alt={hotel.name} />
       </div>
       <div className="absolute bottom-0 p-4 w-full bg-black bg-opacity-50 rounded-b-md">
        <div className="text-white font-bold tracking-tight text-3xl">{hotel.name}</div>
       </div>
  </Link>;
};

export default LatestDestinationCard;
