import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ToastProps, UserState, UserType } from "../types/types";

const initialState: UserState = {
  user: null,
 isAuthenticated: false,
 toastMessageDetails:null,
 isLoggedIn:true,
};
const userReducer = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loggedInUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
    },
   
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoggedIn = false;
    
    },
    showToastMessage:(state,action:PayloadAction<ToastProps>)=>{
      state.toastMessageDetails = action.payload;
     
    },
    hideToastMessage:(state)=>{
      state.toastMessageDetails = null;
    }
  },
});

export const {  logout ,showToastMessage,hideToastMessage,loggedInUser} = userReducer.actions;
export default userReducer;
