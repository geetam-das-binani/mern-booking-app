import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentIntentResponse } from "../../../../backend/src/shared/types";
import {
  BookingFormData,
  BookingResponse,
  SearchCriteria,
  UserType,
} from "../../types/types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { showToastMessage } from "../../reducers/userReducer";
import { useState } from "react";
type Props = {
  currentUser: UserType | null;
  paymentIntent: PaymentIntentResponse;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const search = useSelector(
    (state: { search: SearchCriteria }) => state.search
  );
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalPrice: paymentIntent.amount,
    },
  });
  const { mutate: bookRoom } = useMutation({
    mutationFn: apiClient.makeRoomBooking,
    onSuccess: (data: BookingResponse) => {
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
      navigate("/my-bookings");
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
      setIsDisabled(false);
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    setIsDisabled(true);
    if (!stripe || !elements) return;
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement)!,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      // book the hotel room
      bookRoom({
        ...formData,
        paymentIntentId: result.paymentIntent.id,
      });
    } else {
      setIsDisabled(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="text-gray-700 font-bold text-sm flex-1">
          First Name
          <input
            disabled
            readOnly
            {...register("firstName")}
            type="text"
            className="mt-1 w-full border border-slate-300 rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>

        <label className="text-gray-700 font-bold text-sm flex-1">
          Last Name
          <input
            disabled
            readOnly
            {...register("lastName")}
            type="text"
            className="mt-1 w-full border border-slate-300 rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Email
          <input
            disabled
            readOnly
            type="email"
            {...register("email")}
            className="mt-1 w-full border border-slate-300 rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost :₹{paymentIntent.amount.toFixed(2)}
            <div className="text-xs">Includes Tax and Charges</div>
          </div>
        </div>
      </div>
      <div className="space-y-2 w-[50%]">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        {/* <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        /> */}
        <CardNumberElement className="border rounded-md p-2 text-sm" />
        <CardExpiryElement className="border rounded-md p-2 text-sm" />
        <CardCvcElement className="border rounded-md p-2 text-sm" />
      </div>
      <div className="flex justify-end">
        <button
          disabled={disabled}
          type="submit"
          className="bg-blue-600
           text-white p-2 font-bold
            hover:bg-blue-500 text-md
             disabled:bg-gray-500"
        >
          {disabled ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
