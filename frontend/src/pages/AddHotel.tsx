import { useMutation } from "@tanstack/react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { showToastMessage } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { HotelData } from "../types/types";

const AddHotel = () => {
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.addMyHotel,
    onSuccess: (data:HotelData) => {
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
    },
    onError: (error: Error) => {
     
     
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });
  const handleSave=(hotelFormData:FormData)=>{
    mutate(hotelFormData)
  }
  return <ManageHotelForm onSave={handleSave} isPending={isPending}  />;
};

export default AddHotel;
