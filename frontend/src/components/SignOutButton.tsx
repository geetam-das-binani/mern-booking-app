import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastMessage } from "../reducers/userReducer";
const SignOutButton = (props: any) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();

  const { mutate } = useMutation({
    mutationFn: apiClient.logout,

    onSuccess: async (data: { message: string }) => {
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
    },
  });
  const handleLogout = () => {
    mutate();
  };

  return (
    <button className="text-white px-3 font-bold " onClick={handleLogout}>
      <span className={`${props.label && "text-black"}`}>
        {" "}
        {props.label ? props.label : "Sign Out"}
      </span>
    </button>
  );
};

export default SignOutButton;
