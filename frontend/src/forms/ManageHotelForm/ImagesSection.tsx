import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../types/types";


const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls")
console.log(existingImageUrls);

  
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    e.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      <div
        className="flex flex-col gap-4
      p-4 border rounded"
      >
        {existingImageUrls?.length > 0 && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((imageUrl, index) => (
              <div key={imageUrl} className="relative group">
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="min-h-full h-40 object-cover rounded"
                />
                <button
                  onClick={(e) => handleDelete(e, imageUrl)}
                  className="absolute flex items-center  inset-0 justify-center text-white  bg-black bg-opacity-50 opacity-0
                group-hover:opacity-100
                "
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          id="file"
          type="file"
          multiple
          accept="image/*"
          className="text-gray-700 w-full font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);
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
          <span className="text-red-500 text-sm font-bold">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesSection;
