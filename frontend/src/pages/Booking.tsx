import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { SearchCriteria, UserState } from "../types/types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BookingDeatilsSummary from "../components/BookingDetailsSummary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";
const Booking = () => {
  const stripePromise = loadStripe(STRIPE_PUB_KEY); // stripe promise

  const user = useSelector(
    (state: { authUser: UserState }) => state.authUser.user
  );
  const search = useSelector(
    (state: { search: SearchCriteria }) => state.search
  );
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(
          new Date(search.checkOut).getTime() -
            new Date(search.checkIn).getTime()
        ) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery({
    queryKey: ["paymentIntent", hotelId, numberOfNights],
    queryFn: () =>
      apiClient.createPaymentIntent(hotelId as string, numberOfNights),
    enabled: !!hotelId && numberOfNights > 0, //! only call if hotelid and numberOfNights > 0  if it is present it will fetch automatically
  });

  const { data: hotelData } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //! only call if hotelid is present if it is present it will fetch automatically
  });

  if (!hotelData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr]">
      <div>
        <BookingDeatilsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          numberOfNights={numberOfNights}
          hotel={hotelData.hotel}
          adultCount={search.adultCount}
          childCount={search.childCount}
        />
      </div>
      {user && paymentIntentData && (
         <Elements 
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm paymentIntent={paymentIntentData} currentUser={user}  />
        </Elements> 
      )} 
    </div>
  );
};

export default Booking;
