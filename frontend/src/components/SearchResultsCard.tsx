import { Link } from "react-router-dom";


type Props = {
  hotel: {
    _id: string;
    name: string;
    country: string;
    desc: string;
    city: string;
    type: string;
    adultCount: number;
    childCount: number;
    imageUrls: string[];
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    lastUpdated: Date;
  };
};
const SearchResultsCard = ({ hotel }: Props) => {

  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded
  p-8 gap-8
  "
    >
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span>
              {[...Array(hotel?.starRating)].map((_) => (
                <i className="ri-star-fill text-yellow-300"></i>
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="cursor-pointer font-bold text-2xl ">{hotel.name}</Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.desc}</div>
        </div>

        <div className="grid grid-cols-2 whitespace-nowrap items-end">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">₹{hotel.pricePerNight} per Night</span>
            <Link
            to={`/detail/${hotel._id}`}
            className="bg-blue-600 text-white text-xl font-bold h-full p-2 hover:bg-blue-500 max-w-fit">View More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
