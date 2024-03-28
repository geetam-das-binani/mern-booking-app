import { useDispatch, useSelector } from "react-redux";
import { SearchCriteria } from "../types/types";
import { useState } from "react";
import { saveSearchValues } from "../reducers/searchReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {  useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const SearchBar = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const search = useSelector(
    (state: { search: SearchCriteria }) => state.search
  );
  const dispatch = useDispatch();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<string>(search.checkIn);
  const [checkOut, setCheckOut] = useState<string>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      saveSearchValues({
        adultCount,
        checkIn,
        checkOut,
        childCount,
        destination,
      })
    );
//! whenever any of the above change just invalidate the query and refetch again
    queryClient.invalidateQueries({ queryKey: ["search", search] });

    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md
  grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
items-center gap-4 

  "
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <i className="ri-ancient-pavilion-line mr-2 text-2xl"></i>
        <input
          type="text"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          name="destination"
        />
      </div>
      <div className="flex py-1 gap-2  bg-white px-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            className="focus:outline-none w-full p-1 font-bold"
            min={1}
            max={30}
            value={adultCount}
            onChange={(e) => setAdultCount(Number(e.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            className="focus:outline-none w-full p-1 font-bold"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={new Date(checkIn)}
          onChange={(date: Date) => setCheckIn(date.toISOString())}
          selectsStart
          startDate={new Date(checkIn)}
          endDate={new Date(checkOut)}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          wrapperClassName="min-w-full"
          className="min-w-full bg-white p-2 focus:outline-none"
        />
      </div>
      <div>
        <DatePicker
          selected={new Date(checkOut)}
          onChange={(date: Date) => setCheckOut(date.toISOString())}
          selectsStart
          startDate={new Date(checkIn)}
          endDate={new Date(checkOut)}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          wrapperClassName="min-w-full"
          className="min-w-full bg-white p-2 focus:outline-none"
        />
      </div>
      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg--500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
