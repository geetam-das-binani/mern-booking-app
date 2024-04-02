import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchCriteria } from "../types/types";

const initialState: SearchCriteria = {
  destination: sessionStorage.getItem("destination") || "",
  adultCount: Number(sessionStorage.getItem("adultCount")) || 1,
  childCount: Number(sessionStorage.getItem("childCount")) || 0,
  checkIn: sessionStorage.getItem("checkIn") || new Date().toISOString(),
  checkOut: sessionStorage.getItem("checkOut") || new Date().toISOString(),
  hotelId: sessionStorage.getItem("hotelId") || ""
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    saveSearchValues: (state, { payload }: PayloadAction<SearchCriteria>) => {
      state.destination = payload.destination;
      state.adultCount = payload.adultCount;
      state.childCount = payload.childCount;
      state.checkIn = new Date(payload.checkIn).toISOString(); // Convert ISO string to Date
      state.checkOut = new Date(payload.checkOut).toISOString();
      if (payload.hotelId) {
        state.hotelId = payload.hotelId;
      }
      saveItemsToStorage(payload)
    },
  },
});

export const { saveSearchValues } = searchReducer.actions;
export default searchReducer;


function saveItemsToStorage(payload: SearchCriteria) {
  sessionStorage.setItem("destination", payload.destination);
  sessionStorage.setItem("adultCount", payload.adultCount.toString());
  sessionStorage.setItem("childCount", payload.childCount.toString());
  sessionStorage.setItem("checkIn", payload.checkIn);
  sessionStorage.setItem("checkOut", payload.checkOut);
  sessionStorage.setItem("hotelId", payload.hotelId || "");
  
}