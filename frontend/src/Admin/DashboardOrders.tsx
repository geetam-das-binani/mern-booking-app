import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import Dashboard from "./Dashboard";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";

const DashboardOrders = () => {
  const { data: hotels } = useQuery({
    queryKey: ["orders"],
    queryFn: apiClient.getAllOrdersAdmin,
  });
  if (!hotels) {
    return (
      <div className="text-center text-2xl text-red-500">
        Something Went Wrong
      </div>
    );
  }

  return (
    <TableContainer>
      <Table className="relative" size="sm">
        <Thead>
          <Tr>
            <Th>bookingid</Th>
            <Th>hotelname</Th>

            <Th>totalPrice</Th>
            <Th>paymentstatus</Th>
            <Th>booked on </Th>

            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hotels?.map((hotel) => (
            <Fragment key={hotel._id}>
              {hotel?.bookings?.map((booking) => (
                <Tr
                  key={booking._id}
                  className="hover:bg-blue-600
                 
                   hover:text-white font-semibold duration-300"
                >
                  <Td className="w-4 ">{booking._id}</Td>
                  <Td className="w-4 ">{hotel.hotelName}</Td>
                  <Td className="w-4">₹{booking.totalPrice}</Td>

                  <Td
                    className={`w-4
                  ${
                    booking.paymentStatus === "succeeded"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                  `}
                  >
                    {booking.paymentStatus}
                  </Td>

                  <Td className="w-4">
                    {booking.createdAt
                      ? new Date(booking.createdAt).toDateString()
                      : "N/A"}
                  </Td>

                  <Td>
                    <Link
                      to={`/dashboard/booking/detail/${hotel._id}/${booking._id}`}
                    >
                      {" "}
                      <i className="ri-pencil-fill text-2xl mr-2"></i>
                    </Link>
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard(DashboardOrders);
