import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types/types";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-2 p-6 bg-gray-300">
        <label className="text-gray-700  text-sm font-semibold">
            Adults
          <input
          id="adultCount"
          min={1}
          className="border rounded w-full py-1 px-3 font-normal"
          type="number" placeholder="Adults" {...register("adultCount",{required:"This field is required"})} />{" "}
          {
            errors.adultCount && (
              <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
            )
          }
        </label>
        <label className="text-gray-700 text-sm font-semibold">
            Children
          <input
          id="childCount"
          min={0}
           className="border rounded w-full py-1 px-2 font-normal"
            type="number"
            placeholder="Children"
            {...register("childCount",{required:"This field is required"})}
          />
          {
            errors.childCount && (
              <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
            )
          }
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
