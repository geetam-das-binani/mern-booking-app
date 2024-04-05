import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestsInfoFrom/GuestInfoForm";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../types/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
const Details = () => {
  const { hotelId } = useParams();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const user = useSelector(
    (state: { authUser: UserState }) => state.authUser.user
  );
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: hotelData } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //! only call if hotelid is present if it is present it will fetch automatically
  });

  if (!hotelData) {
    return <></>;
  }
  return (
    <div className="grid space-y-6">
      <div>
        <span className="flex items-center">
          {[...Array(hotelData?.hotel?.starRating)].map((_) => (
            <i className="ri-star-fill text-yellow-300"></i>
          ))}
        </span>
        <div className="flex gap-8">
          <h1 className="text-3xl font-bold">{hotelData?.hotel?.name}</h1>
          <button
          onClick={onOpen}
          className="rounded-full p-3 bg-blue-500 text-white fony-bold hover:bg-blue-600 cursor-pointer">
            Want to add Review ?
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData?.hotel?.imageUrls?.map((imageUrl) => (
          <div key={imageUrl} className="h-[300px]">
            <img
              className="object-cover object-center h-full w-full rounded-md"
              src={imageUrl}
              alt={hotelData?.hotel?.name}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData?.hotel?.facilities?.map((facility) => (
          <div
            key={facility}
            className="border border-slate-300 rounded-md  p-3"
          >
            {facility}
          </div>
        ))}
      </div>
      {/* user reviews */}
      {hotelData?.hotel?.reviews?.length > 0 && (
        <div
          className="md:w-[800px] w-[550px]  overflow-x-scroll
        
        "
        >
          <p className="text-2xl font-bold">Reviews</p>

          <div className="flex gap-2 w-full md:h-[150px] p-1 ">
            {hotelData?.hotel?.reviews?.map((reviews) => (
              <ReviewCard reviews={reviews} />
            ))}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2">
        <div className="whitespace-pre-line">{hotelData?.hotel?.desc}</div>

        <div className="h-fit">
          <GuestInfoForm
            hotelId={hotelId || ""}
            pricePerNight={hotelData?.hotel?.pricePerNight}
          />
        </div>

      </div>


      <Modal
        
      
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </div>
  );
};

export default Details;
