import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { DataType } from "../types/types";
import { useDispatch } from "react-redux";
import { showToastMessage } from "../reducers/userReducer";
import Modal from "./Modal";

export type ModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  userId?: string;
  handleDelete?: () => void;
  reviewId?: string;
  hotelId?: string;
  bookingId?:string
};
const DeleteUserModal = ({ isOpen, onClose, userId, onOpen }: ModalProps) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate } = useMutation({
    mutationFn: apiClient.deleteUser,
    onSuccess: async (data: DataType) => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
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
    if (!userId) return;
    mutate(userId);
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

export default DeleteUserModal;
