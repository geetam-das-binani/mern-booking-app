import { useDispatch, useSelector } from "react-redux";
import { DataType, UserState, UserType } from "../types/types";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { showToastMessage } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(
    (state: { authUser: UserState }) => state.authUser.user
  );
  const [file, setFile] = useState<File | "">("");
  const {
    register,

    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserType>();

  useEffect(() => {
    reset({
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  }, [reset]);
  if (!user?._id) return <></>;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0]
    if (inputFile) {
      setFile(inputFile);
    }
  };
  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateUserProfile,
    onSuccess: async (data: DataType) => {
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
    

      dispatch(showToastMessage({ message: data.message, type: "SUCCESS" }));
      setFile("");
      navigate("/profile");
    },
    onError: (error: Error) => {
      dispatch(showToastMessage({ message: error.message, type: "ERROR" }));
    },
  });

  const onSubmit = handleSubmit((formDataJson: UserType) => {
    const formData = new FormData() as FormData;
    formData.append("email", formDataJson.email);
    formData.append("firstName", formDataJson.firstName);
    formData.append("lastName", formDataJson.lastName);
    if (file) {
      formData.append("photo", file);
    }
    mutate(formData);
    // setFile("");
  });

  return (
    <form
      onSubmit={onSubmit}
      className="
      border border-slate-300 rounded-md
      flex flex-col w-[50%] mx-auto  bg-blue-400 p-10
gap-5 
"
    >
      <h2 className="text-3xl font-bold ">Update Your Profile</h2>
      <div>
        {file ? (
          <img
            className="h-32 w-32 p-2 bg-white rounded-full"
            src={URL.createObjectURL(file)}
            alt={user?.firstName}
          />
        ) : (
          <img
            className="h-32 w-32 p-2 bg-white rounded-full"
            src={user?.avatar}
            alt={user?.firstName}
          />
        )}
      </div>
      <div className=" flex flex-col gap-5">
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
        <label className=" bg-white">
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            onChange={handleAvatarChange}
            type="file"
            name="file"
            accept="image/*"
          />
        </label>
      </div>

      <span>
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 text-xl
      disabled:bg-gray-400
      "
        >
          {isPending ? "Updating..." : "Update"}
        </button>
      </span>
    </form>
  );
};

export default UpdateProfile;
