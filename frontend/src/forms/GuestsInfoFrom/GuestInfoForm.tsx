import { useForm } from "react-hook-form";
import {
  GuestInfoFormData,
  SearchCriteria,
  UserState,
} from "../../types/types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSearchValues } from "../../reducers/searchReducer";

type Props = {
  hotelId: string;
  pricePerNight: number;
};
const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSelector(
    (state: { search: SearchCriteria }) => state.search
  );
  const isAuthenticated = useSelector(
    (state: { authUser: UserState }) => state.authUser.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    watch,
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: new Date(search.checkIn),
      checkOut: new Date(search.checkOut),
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const handleSignInClick = handleSubmit((data: GuestInfoFormData): void => {
    dispatch(
      saveSearchValues({
        adultCount: data.adultCount,
        childCount: data.childCount,
        checkIn: data.checkIn.toISOString(),
        checkOut: data.checkOut.toISOString(),
        destination: "",
      })
    );
    navigate(`/login?detail=${hotelId}`);
    // navigate(`/login`, { state: { from: location } });
    // location come from useLocation
  });
  const handleOnSubmit = handleSubmit((data: GuestInfoFormData): void => {
    dispatch(
      saveSearchValues({
        adultCount: data.adultCount,
        childCount: data.childCount,
        checkIn: data.checkIn.toISOString(),
        checkOut: data.checkOut.toISOString(),
        destination: "",
      })
    );
    navigate(`/hotel/${hotelId}/booking`);
  });
  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <h3 className="font-bold text-sm">₹{pricePerNight}</h3>
      <form onSubmit={isAuthenticated ? handleOnSubmit : handleSignInClick}>
        <div className="grid grid-cols-1 items-center gap-4">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date: Date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              wrapperClassName="min-w-full"
              className="min-w-full bg-white p-2 focus:outline-none"
            />
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date: Date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              wrapperClassName="min-w-full"
              className="min-w-full bg-white p-2 focus:outline-none"
            />
          </div>
          <div className="flex py-1 gap-2  bg-white px-2">
            <label className="items-center flex">
              Adults:
              <input
                type="number"
                className="focus:outline-none w-full p-1 font-bold"
                min={1}
                max={30}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "Minimum 1 adult required",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                type="number"
                className="focus:outline-none w-full p-1 font-bold"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isAuthenticated ? (
            <button className="bg-blue-600 text-white h-full p-2 font-bold  hover:bg-blue-500 text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-600 text-white h-full p-2 font-bold  hover:bg-blue-500 text-xl">
              Sign In To Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
