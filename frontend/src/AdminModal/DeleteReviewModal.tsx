import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ModalProps } from "./DeleteUserModal";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import * as apiClient from "../api-client";
import { showToastMessage } from "../reducers/userReducer";
import { DataType } from "../types/types";
const DeleteReviewModal = ({
  isOpen,
  onClose,
  onOpen,
  reviewId,
  hotelId,
}: ModalProps) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: apiClient.deleteReviewAdmin,
    onSuccess: async (data:DataType) => {
      await queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      dispatch(
        showToastMessage({
          message: data.message,
          type: "SUCCESS",
        })
      );
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });
  const handleDelete = () => {
    if (!reviewId || !hotelId) {
      dispatch(showToastMessage({ message: "Something went wrong", type: "ERROR" }));
      return;
    }
    mutate({
      reviewId,
      hotelId,
    });
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      handleDelete={handleDelete}
      
    />
  );
};

export default DeleteReviewModal;
