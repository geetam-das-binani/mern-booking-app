import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

const MyBookings = () => {
  const { data: myBookings } = useQuery({
    queryKey: ["myBookings"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (myBookings?.hotel.length === 0) {
    return <span>No Bookings Found</span>;
  }
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {myBookings?.hotel?.map((hotel) => {
        return (
          <div
            key={hotel._id}
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5"
          >
            <div className="lg:w-full h-[250px]">
              <img
                className="w-full h-full object-cover object-center"
                src={hotel?.imageUrls[0]}
              />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
              <div className="text-2xl font-bold">
                {hotel?.name}
                <div className="text-xs font-normal">
                  {hotel?.city},{hotel?.country}
                </div>
              </div>
              {hotel?.bookings?.map((booking) => (
                <div>
                  <div>
                    <span className="font-bold mr-2">Dates:</span>

                    <span>
                      {new Date(booking?.checkIn).toDateString()} -{" "}
                      {new Date(booking?.checkOut).toDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-2">Guests:</span>
                    <span>
                      {booking?.adultCount} adults,
                      {booking?.childCount} children
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookings;
