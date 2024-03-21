import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types/types";

const DetailsSection = () => {
  const {
    register,
    
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
         id="name"
          type="text"
          {...register("name",{required:"This field is required"})}
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </label>
      <div className="flex gap-4 items-center">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            id="country"
            type="text"
            {...register("country", { required:"This field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.country && (
            <p className="text-red-500">{errors.country.message}</p>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            id="city"
            type="text"
            {...register("city", { required: "This field is required" })}
            className="border rounded w-full py-1 px-2 font-normal"
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
        id="description"
          rows={10}
          {...register("desc", { required: "This field is required" })}
          className="border rounded w-full py-1 px-2 font-normal"
        ></textarea>
        {errors.desc && <p className="text-red-500">{errors.desc.message}</p>}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50vw]">
        Price Per Night
        <input
        id="pricePerNight"
          type="number"
          min={1}
          {...register("pricePerNight", { required: "This field is required" })}
          className="border rounded w-full py-1 px-2 font-normal"
        />
        {errors.pricePerNight && (
          <p className="text-red-500">{errors.pricePerNight.message}</p>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold max-w-[50vw]">
        Star Rating
        <select
        id="starRating"
        {...register("starRating",{required:'This field is required'})}
        className="border rounded  w-full p-2 text-gray-700 font-normal"
        >
          <option className="text-sm font-bold" value="">
            Select as Rating
          </option>
          {[...new Array(5)].map((_, idx) => (
            <option key={idx} value={idx + 1}>
              {idx + 1}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <p className="text-red-500">{errors.starRating.message}</p>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
