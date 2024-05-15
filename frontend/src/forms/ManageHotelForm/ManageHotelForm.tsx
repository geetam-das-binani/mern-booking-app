import { FormProvider, useForm } from "react-hook-form";
import { HotelFormData, HotelType } from "../../types/types";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";

type Props = {
  hotelData?: HotelType | null;
  onSave: (hotelFormData: FormData) => void;
  isPending: boolean;
};
const ManageHotelForm = ({ hotelData, onSave, isPending }: Props) => {
  const formMethods = useForm<HotelFormData>({});
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (hotelData) reset(hotelData);
  }, [hotelData, reset]);
  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotelData) {
      formData.append("hotelId", hotelData._id as string);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("desc", formDataJson.desc);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }
    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });


  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-col gap-10">
        <DetailsSection />
        <TypesSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isPending}
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
