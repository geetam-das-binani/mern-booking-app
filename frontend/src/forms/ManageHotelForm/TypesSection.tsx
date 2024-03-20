import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "../../types/types";

const TypesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const typeWatched = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
      
        
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`${
              typeWatched === type
                ? "bg-blue-300 cursor-pointer  text-sm rounded-full px-4 py-2 font-semibold"
                : "bg-gray-300 cursor-pointer  text-sm rounded-full px-4 py-2 font-semibold"
            }`}
          >
            <input
              hidden
              type="radio"
              value={type}
              {...register("type", { required: "Please select a type" })}
              className="border rounded py-1 px-2 font-normal"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {
        errors.type && <span className="text-red-500 text-sm font-bold">{errors.type.message}</span>
      }
    </div>
  );
};

export default TypesSection;
