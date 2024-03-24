import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { showToastMessage } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const EditHotel = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: hotelData} = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //! only call if hotelid is present if it is present it will fetch automatically
  });

  const { mutate,isPending } = useMutation({
    mutationFn: (hotelFormData: FormData) =>
      apiClient.editMyHotelById( hotelFormData),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["hotel", hotelId] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm
      onSave={handleSave}
      hotelData={hotelData?.hotel ||  null}
      isPending={isPending}
    />
  );
};

export default EditHotel;
