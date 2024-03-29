import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastMessage } from "../reducers/userReducer";
const SignOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { mutate } = useMutation({
    mutationFn: apiClient.logout,

    onSuccess: async (data: { message: string }) => {
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));

      if (pathname !== "/") {
        const [path, id] = pathname.split("/").filter((path) => path);
        

        navigate(`/login?${path}=${id}`);
      } else {
        navigate("/login");
      }
    },
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={handleLogout}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
