import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../reducers/userReducer";

const DeleteButton = ({ hotelId }: { hotelId: string }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
 const  {mutate}=useMutation({
    mutationFn: apiClient.deleteReview,
    onSuccess: async (data) => {
      dispatch(
        showToastMessage({
          message: data.message,
          type: "SUCCESS",
        })
      );
      await queryClient.invalidateQueries({ queryKey: ["hotel", hotelId] });
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });
  const deleteHandler = () => {
    if(!hotelId) return
    mutate(hotelId);
  };
  return (
    <button
      className="rounded-full  p-3 bg-red-500 text-white font-bold hover:bg-red-600 cursor-pointer"
      onClick={deleteHandler}
    >
      Delete Review
    </button>
  );
};

export default DeleteButton;
