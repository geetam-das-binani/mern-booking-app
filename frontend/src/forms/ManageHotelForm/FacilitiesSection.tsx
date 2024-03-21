import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types/types";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3 ">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facilitity) => (
          <label
            className="text-sm flex items-center gap-1 text-gray-700"
            key={facilitity}
          >
            <input
            id="facilities"
              type="checkbox"
              value={facilitity}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "Please select at least one facility";
                  }
                },
              })}
            />
            {facilitity}
          </label>
        ))}
      </div>
      {
        errors.facilities && (
          <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
        )
      }
    </div>
  );
};

export default FacilitiesSection;
