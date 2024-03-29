import { useSelector } from "react-redux";
import { SearchCriteria } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";
import SortOptions from "../components/SortOptions";

const Search = () => {
  const search = useSelector(
    (state: { search: SearchCriteria }) => state.search
  );
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);
  const [selectedOption,setSelectedOption] = useState<string | undefined>("");
  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedStars((prevStars) =>
      checked
        ? [...prevStars, value]
        : prevStars.filter((star) => star !== value)
    );
  };
  const handleTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedTypes((prevTypes) =>
      checked
        ? [...prevTypes, value]
        : prevTypes.filter((type) => type !== value)
    );
  };
  const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedFacilities((prevFacilities) =>
      checked
        ? [...prevFacilities, value]
        : prevFacilities.filter((facility) => facility !== value)
    );
  };
  const handlePriceChange = (value?: number | undefined) => {
    setSelectedPrice(value);
  }
  const handleSortOptionChange=(value?:string | undefined)=>{
     setSelectedOption(value)
  }
  
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn,
    checkOut: search.checkOut,
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice:selectedPrice?.toString(),
    sortOption:selectedOption,
  };
  const { data: hotelData } = useQuery({
    queryKey: ["search", searchParams],
    queryFn: () => apiClient.searchHotel(searchParams),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">
      <div
        className="rounded-lg border border-slate-300 
      p-5 h-fit sticky top-10"
      >
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter By:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedTypes={selectedTypes}
            onChange={handleTypesChange}
          />
          <HotelFacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilities={selectedFacilities}
          />
          <PriceFilter
          selectedPrice={selectedPrice}
          onChange={handlePriceChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.response?.pagination?.total} Hotels Found{" "}
            {search.destination ? `in ${search.destination} ` : ""}
          </span>
        <SortOptions
        option={selectedOption}
        onChange={handleSortOptionChange}/>
        </div>
        {hotelData?.response?.data?.map((hotel) => (
          <SearchResultsCard key={hotel?.name} hotel={hotel} />
        ))}
        <div>
          {hotelData?.response?.data?.length ? (
            <Pagination
              page={hotelData?.response?.pagination?.page || 1}
              pages={hotelData?.response?.pagination?.pages || 1}
              onPageChange={(page) => setPage(page)}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
