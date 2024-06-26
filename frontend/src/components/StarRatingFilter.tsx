type Props = {
  selectedStars: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star: string) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={star}
            value={star}
            onChange={onChange}
            checked={selectedStars.includes(star)}
            className="rounded"
          />
          <span>{star} </span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
