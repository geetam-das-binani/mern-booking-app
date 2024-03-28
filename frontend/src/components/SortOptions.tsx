type Props = {
  option?: string;
  onChange: (value?: string) => void;
};

const SortOptions = ({ option, onChange }: Props) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value ? e.target.value : undefined)}
      value={option}
      className=" p-2 border rounded-md"
    >
      <option value="">Sort By</option>
      <option value="starRatingAscending">Star Rating (low to high)</option>
      <option value="starRatingDescending">Star Rating (high to low)</option>
      <option value="pricePerNightAscending">
        Price Per Night (low to high)
      </option>
      <option value="pricePerNightDescending">
        Price Per Night (high to low)
      </option>
      <option value="lastUpdated">Most Recent</option>
    </select>
  );
};

export default SortOptions;
