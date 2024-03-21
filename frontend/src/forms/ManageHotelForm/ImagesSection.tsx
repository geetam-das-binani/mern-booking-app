import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types/types";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      <div
        className="flex flex-col gap-4
      p-4 border rounded"
      >
        <input
        id="file"
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "Please select at least one image";
              }
              if (totalLength > 6) {
                return "You can select only 6 images";
              }
              return true;
            },
          })}
        />

        {errors.imageFiles && (
          <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
