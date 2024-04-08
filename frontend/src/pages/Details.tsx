import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import GuestInfoForm from "../forms/GuestsInfoFrom/GuestInfoForm";
import ReviewCard from "../components/ReviewCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReviewResponse, UserState } from "../types/types";
import ReviewModal from "../modal/ReviewModal";
import { useDisclosure } from "@chakra-ui/react";
import { showToastMessage } from "../reducers/userReducer";
import DeleteButton from "../components/DeleteButton";
import AddReviewButton from "../components/AddReviewButton";

const Details = () => {
  const queryClient = useQueryClient();
  const { hotelId } = useParams();
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: hotelData } = useQuery({
    queryKey: ["hotel", hotelId],
    queryFn: () => apiClient.fetchMyHotelById(hotelId || ""),
    enabled: !!hotelId, //! only call if hotelid is present if it is present it will fetch automatically
  });

  const { mutate } = useMutation({
    mutationFn: apiClient.addReview,
    onSuccess: async (data: ReviewResponse) => {
      await queryClient.invalidateQueries({ queryKey: ["hotel", hotelId] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });

  if (!hotelData) {
    return <></>;
  }
  const handleRating = (rating: number) => {
    setRating(rating);
  };
  const handleComment = (comment: string) => {
    setComment(comment);
  };

  const handleSave = () => {
    if (!comment || rating === 0) {
      dispatch(
        showToastMessage({
          message: "Please add comment and rating",
          type: "ERROR",
        })
      );
      onClose();
      return;
    }
    const formDataJson = {
      rating,
      comment,
      name: `${user?.firstName} ${user?.lastName}`,
      avatar: user?.avatar as string,
      hotelId,
    };

    mutate(formDataJson);
    setComment("");
    setRating(0);
    onClose();
  };
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
          {/* add review button */}
          <AddReviewButton onOpen={onOpen} />

          {/* delete review button */}
          {isAuthenticated &&
            hotelData?.hotel?.reviews?.length > 0 &&
            hotelData?.hotel?.reviews?.some(
              (review) => review.userId?.toString() === user?._id.toString()
            ) && <DeleteButton hotelId={hotelId || ""} />}

          <ReviewModal
            isOpen={isOpen}
            onClose={onClose}
            rating={rating}
            comment={comment}
            handleRating={handleRating}
            handleComment={handleComment}
            onSave={handleSave}
          />
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
        <div className="md:w-[800px] w-[550px]  overflow-x-scroll">
          <p className="text-2xl font-bold">Reviews</p>

          <div className="flex gap-2 w-full md:h-[150px] p-1 ">
            {hotelData?.hotel?.reviews?.map((review) =>
              
                <ReviewCard key={review._id} review={review} />
              
            )}
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
    </div>
  );
};

export default Details;
