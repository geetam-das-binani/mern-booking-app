import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { DataType } from "../types/types";
import { showToastMessage } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const DashboardOrderDetails = () => {
  const { hotelId, bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ["h"],
    queryFn: () =>
      apiClient.getSingleBookingDetailAdmin(hotelId || "", bookingId || ""),
    enabled: !!hotelId && !!bookingId,
  });
  const { mutate } = useMutation({
    mutationFn: () =>
      apiClient.deleteOrderAdmin(hotelId || "", bookingId || ""),
    onSuccess: (data: DataType) => {
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
      navigate(`/dashboard/orders`);
    },

    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });
  if (!data) {
    return <div>Something Went Wrong</div>;
  }

  const calculateDays = () => {
    const diffDate =
      Math.abs(
        new Date(data.bookings[0].checkOut).getTime() -
          new Date(data.bookings[0].checkIn).getTime()
      ) /
      (1000 * 60 * 60 * 24);

    return Math.ceil(diffDate);
  };
  const handleDelete = () => {
    if (!bookingId || !hotelId) {
      dispatch(
        showToastMessage({ message: "Something went wrong", type: "ERROR" })
      );
      return;
    }
    mutate();
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Order Details for hotel #{data._id}
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_3fr] p-4
    border border-slate-300 rounded-md shadow-md mt-2
    "
      >
        <div className="h-[300px] w-full">
          <img
            src={data.imageUrls[0]}
            alt={data.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="grid  ml-5 gap-2   font-bold">
          <div>
            <h2 className="text-xl">{data.name}</h2>
            <h3>
              {data.city},{data.country}
            </h3>
          </div>
          <div>
            Dates:{" "}
            <span>
              {new Date(data.bookings[0].checkIn).toDateString()} -{" "}
              {new Date(data.bookings[0].checkOut).toDateString()}
            </span>
          </div>
          <div>
            Guests : {data.bookings[0].adultCount} adults,
            {data.bookings[0].childCount} children
          </div>
          <div>
            <p>PricePerNight ₹{data.pricePerNight}</p>
            <p>Number of Days -{calculateDays()} days</p>
            <p>TotalPrice- ₹{data.bookings[0].totalPrice}</p>
          </div>
          <div>
            Name: {data.bookings[0].firstName} {data.bookings[0].lastName}
            <br />
            Email: {data.bookings[0].email}
          </div>
          <div>
            Payment Status -{" "}
            <span
              className={`rounded-md ${
                data.bookings[0].paymentStatus === "succeeded"
                  ? "bg-green-500 hover:bg-green-400 "
                  : "bg-red-600 hover:bg-red-500 "
              } text-white p-2 hover:duration-150`}
            >
              {data.bookings[0].paymentStatus === "succeeded"
                ? "PAID"
                : "NOT PAID"}
            </span>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer duration-200"
            >
              Delete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderDetails;
