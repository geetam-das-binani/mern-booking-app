import { useQuery } from "@tanstack/react-query";
import Dashboard from "./Dashboard";
import * as apiClient from "../api-client";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DashboardHotels = () => {
  const { data: hotelData } = useQuery({
    queryKey: ["hotels"],
    queryFn: apiClient.getMyHotels,
  });

  return (
    <TableContainer>
      <Table className="relative" size="sm">
        <Thead className="sticky top-0">
          <Tr>
            <Th>hotelId</Th>
            <Th>name</Th>
            <Th>pricepernight</Th>
            <Th>Rating</Th>
            <Th>created at </Th>
            <Th>images</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {hotelData?.hotel?.map((hotel) => (
            <Tr
            key={hotel._id}
            className="hover:bg-blue-600 hover:text-white font-semibold duration-300 ">
              <Td className="w-1">{hotel?._id}</Td>
              <Td className="w-1">{hotel?.name}</Td>
              <Td className="w-1">₹{hotel.pricePerNight}</Td>

              <Td
                className={` text-center
                    w-1
                    ${hotel.starRating >= 4 ? "text-green-600" : "text-red-600"}
                    `}
              >
                {hotel.starRating}
              </Td>
              <Td className="w-1">
                {hotel?.createdAt
                  ? new Date(hotel.createdAt).toDateString()
                  : "N/A"}
              </Td>
              <Td>
                <img
                  className="w-10 h-10 rounded-full"
                  src={hotel.imageUrls[0]}
                  alt={hotel.name}
                />
              </Td>
              <Td className="w-3 cursor-pointer">
                <span className="flex justify-between items-center">
                  
                  <Link to={`/dashboard/edit-hotel/${hotel._id}`}>
                    <i className="ri-pencil-fill text-2xl"></i>
                  </Link>
                  <Link to="/dashboard/add-hotel">
                    <i className="ri-add-fill text-2xl"></i>
                  </Link>
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard(DashboardHotels);
