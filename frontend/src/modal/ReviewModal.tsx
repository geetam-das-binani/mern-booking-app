import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  comment: string;
  handleRating: (rating: number) => void;
  handleComment: (comment: string) => void;
  onSave: () => void;
};
const ReviewModal = ({
  isOpen,
  onClose,
  comment,
  handleComment,
  handleRating,
  onSave,
  rating,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a Review</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Comment</FormLabel>
            <Input
              value={comment}
              onChange={(e) =>
                handleComment(e.target.value ? e.target.value : "")
              }
              placeholder="any comments..."
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Rating</FormLabel>
            <Select
              value={rating}
              onChange={(e) =>
                handleRating(e.target.value ? Number(e.target.value) : 0)
              }
            >
              <option value="">Select a Rating</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button 
          onClick={onSave}
          colorScheme="blue" mr={3}>
            Post
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
