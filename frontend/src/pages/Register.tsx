import { useForm } from "react-hook-form";
import { DataType, RegisterFormData, UserState } from "../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useDispatch, useSelector } from "react-redux";
import { showToastMessage } from "../reducers/userReducer";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSelector(
    (state: { authUser: UserState }) => state.authUser
  );

  const dispatch = useDispatch();
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (inputFile) {
      setFile(inputFile);
    }
  };
  // ! post user registration data to backend
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.register,

    onSuccess: async (data: DataType) => {
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));

      navigate("/");
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });

  // !when form gets form submitted
  const onSubmit = handleSubmit((data: RegisterFormData) => {
    const formData = new FormData() as FormData;
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("photo", file as File);

    // ! fix photo issue not coming showing undefined

    mutate(formData);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col 
    gap-5 
    "
    >
      <h2 className="text-3xl font-bold ">Create An Account</h2>
      <div className=" flex flex-col gap-5 md:flex-row">
        <label className="text-gray-700 text-sm font-bold flex-1">
          FirstName
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
            type="text"
            name="firstName"
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          LastName
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
            type="text"
            name="lastName"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
            minLength: { value: 8, message: "Must be at least 8 characters" },
          })}
          type="password"
          name="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Password do not match";
              }
            },
          })}
          type="text"
          name="confirmPassword"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Choose Photo
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          onChange={handleAvatarChange}
          type="file"
          name="photo"
          accept="image/*"
          required
        />
      </label>
      <span>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl
          disabled:bg-gray-400
          "
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
