import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchCriteria } from "../types/types";

const initialState: SearchCriteria = {
  destination: "",
  adultCount: 1,
  childCount: 0,
  checkIn: new Date().toISOString(),
  checkOut: new Date().toISOString(),
  hotelId: "",
  
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
    },
  },
});

export const { saveSearchValues } = searchReducer.actions;
export default searchReducer;
