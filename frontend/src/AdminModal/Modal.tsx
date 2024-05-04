import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,

  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { ModalProps } from "./DeleteUserModal";

const Modal = ({ isOpen, onClose, handleDelete, onOpen }: ModalProps) => {
  return (
    <>
      <i onClick={onOpen} className=" ri-delete-bin-fill text-xl"></i>

      <ChakraModal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backgroundColor={"blackAlpha.300"} />
        <ModalContent>
          <ModalHeader>Are you Sure you want to delete ?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              No
            </Button>
            <Button onClick={handleDelete} colorScheme="blue">
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
};

export default Modal;
