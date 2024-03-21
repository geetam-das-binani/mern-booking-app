import {
  DataType,

  LoginFormData,
  RegisterFormData,
} from "./types/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (
  formData: RegisterFormData
): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async (formData: LoginFormData): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async (): Promise<{
  message: string;
}> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};
export const loadUser = async (): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/create-hotel`, {
    credentials: "include",
    method: "POST",
   
    body: hotelFormData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
