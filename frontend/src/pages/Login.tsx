import { useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { DataType, LoginFormData, UserState } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastMessage } from "../reducers/userReducer";
import * as apiClient from "../api-client";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );
  const dispatch = useDispatch();
  const params = useSearchParams()[0];
  const queryParams = [...new URLSearchParams(params).keys()];


  useEffect(() => {
    if (isAuthenticated) {
      if (queryParams.length > 0) {
        const id=new URLSearchParams(params).get(queryParams[0] as string)
        navigate(`/${queryParams[0]}/${id}`);
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated]);

  //! post user login data to backend
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.login,

    onSuccess: async (data: DataType) => {
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
    //  navigate(location.state?.from?.pathname || "/");
    // location comes from use location 
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });

  // ! when form gets submitted
  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <form onSubmit={onSubmit} className="flex-col flex gap-5">
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
          type="email"
          name="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
          })}
          type="password"
          name="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registererd ?
          <Link className="underline" to="/register">
            {" "}
            Create an account here
          </Link>
        </span>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl
          disabled:bg-gray-400
          "
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default Login;
