import {
  BookingFormData,
  BookingResponse,
  DataType,
  HotelData,
  HotelDataType,
  HotelSearchResponse,
  
  Hotels,
  LoginFormData,
  MyBookingsResponse,
  Review,
  ReviewResponse,
  SearchParams,
  UserType,
} from "./types/types";
import {
  BookingType,
  PaymentIntentResponse,
  ReviewType,
} from "../../backend/src/shared/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData: FormData): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
    method: "POST",

    body: formData,
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

export const getMyHotels = async (): Promise<HotelDataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/get-hotels`, {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const fetchHotels = async (): Promise<Hotels> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/allhotels`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
export const fetchMyHotelById = async (hotelId: string): Promise<HotelData> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/hotel/${hotelId}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const editMyHotelById = async (
  hotelFormData: FormData
): Promise<HotelData> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/edit/${hotelFormData.get("hotelId")}`,
    {
      credentials: "include",
      method: "PUT",
      body: hotelFormData,
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const searchHotel = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", searchParams.page || "");
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("maxPrice", searchParams.maxPrice?.toString() || "");
  queryParams.append("sortOption", searchParams.sortOption?.toString() || "");

  searchParams.facilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });
  searchParams.types?.forEach((type) => {
    queryParams.append("types", type);
  });
  searchParams.stars?.forEach((star) => {
    queryParams.append("stars", star);
  });

  const response = await fetch(`${API_BASE_URL}/api/v1/search?${queryParams}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: number
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/${hotelId}/bookings/payment-intent`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ numberOfNights }),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const makeRoomBooking = async (
  formData: BookingFormData
): Promise<BookingResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/${formData.hotelId}/bookings`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const fetchMyBookings = async (): Promise<{
  hotel: MyBookingsResponse[];
}> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/mybookings`, {
    credentials: "include",
    method: "GET",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateUserProfile = async (
  formData: FormData
): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/update`, {
    credentials: "include",
    method: "POST",
    body: formData,
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const addReview = async (
  formDataJson: ReviewType
): Promise<ReviewResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/reviews/${formDataJson.hotelId}`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(formDataJson),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const deleteReview = async (
  hotelId: string
): Promise<ReviewResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/reviews/delete/${hotelId}`,
    {
      credentials: "include",
      method: "POST",
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

// ! Admin endpoints
export const getAllUsers = async (): Promise<UserType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/allUsers`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const deleteUser = async (userId: string): Promise<DataType> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/delete/${userId}`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllReviews = async (): Promise<Review[]> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/admin-get-reviews`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const deleteReviewAdmin = async (reviewObj: {
  hotelId: string;
  reviewId: string;
}): Promise<DataType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin-delete-review/${reviewObj.hotelId}`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId: reviewObj.reviewId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllOrdersAdmin = async (): Promise<
  {
    _id: string;
    hotelName: string;
    bookings: BookingType[];
  }[]
> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/all-orders`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getSingleBookingDetailAdmin = async (
  hotelId: string,
  bookingId: string
): Promise<MyBookingsResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin-single-order-detail/${hotelId}/${bookingId}`,
    {
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const deleteOrderAdmin = async (
  hotelId: string,
  bookingId: string
): Promise<DataType> => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin-delete-order/${hotelId}`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingId }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const gettDashBoardData=async()=>{
  const response = await fetch(
    `${API_BASE_URL}/api/v1/admin/dashboard-data`,
    {
      credentials: "include",
     
      
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}
