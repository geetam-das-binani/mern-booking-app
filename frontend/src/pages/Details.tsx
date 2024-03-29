import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestsInfoFrom/GuestInfoForm";

const Details = () => {
  const { hotelId } = useParams();

  
  const { data: hotelData } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //! only call if hotelid is present if it is present it will fetch automatically
  });

  if (!hotelData) {
    return <></>;
  }
  return (
    <div className="grid space-y-6">
      <div>
        <span className="flex items-center">
          {[...Array(hotelData?.hotel?.starRating)].map((_) => (
            <i className="ri-star-fill text-yellow-300"></i>
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelData?.hotel?.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData?.hotel?.imageUrls?.map((imageUrl) => (
          <div  key={imageUrl} className="h-[300px]">
            <img
              className="object-cover object-center h-full w-full rounded-md"
              src={imageUrl}
              alt={hotelData?.hotel?.name}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData?.hotel?.facilities?.map((facility) => (
          <div
          key={facility}
          className="border border-slate-300 rounded-md  p-3">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelData?.hotel?.desc}</div>
        <div className="h-fit">
          <GuestInfoForm 
        hotelId={hotelId || ""}
        pricePerNight={hotelData?.hotel?.pricePerNight}
        /></div>
      </div>
    </div>

  );

};

export default Details;


