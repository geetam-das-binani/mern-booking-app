import { useEffect } from "react";
import { ToastProps } from "../types/types";

import { hideToastMessage } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const Toast = ({ message, type }: ToastProps) => {
 const dispatch = useDispatch()
 
useEffect(()=>{
  const timer= setTimeout(()=>{
         dispatch(hideToastMessage())
          
        },5000)
        return  ()=>clearTimeout(timer)
    },[])
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
