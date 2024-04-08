import { ReviewType } from "../../../backend/src/shared/types";

const ReviewCard = ({ review }: { review: ReviewType }) => {
 

  return (
    <div
      className="bg-gray-100 border
  w-[40%] flex flex-col justify-center items-center
    border-slate-300 rounded-md p-4"
    >
      <div>
        <img
          className="w-12 h-12 rounded-full"
          src={review.avatar}
          alt={review.name}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h4 className="font-bold">{review.name}</h4>
        <h4 className="font-semibold">{review.comment}</h4>
        <h4>
          {" "}
          {[...new Array(review.rating).keys()].map((star) => (
            <span key={star}>⭐</span>
          ))}
        </h4>
      </div>
    </div>
  );
};

export default ReviewCard;
