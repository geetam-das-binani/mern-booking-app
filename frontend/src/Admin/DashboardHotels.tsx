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
  TableContainer
} from "@chakra-ui/react";

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
            <Tr className="hover:bg-blue-600 hover:text-white font-semibold duration-300 ">
              <Td className="w-2">{hotel?._id}</Td>
              <Td className="w-2">{hotel?.name}</Td>
              <Td className="w-2">{hotel.pricePerNight}</Td>
              <Td className="w-2">{hotel.starRating}</Td>
              <Td className="w-2">
                {hotel?.createdAt
                  ? new Date(hotel.createdAt).toDateString()
                  : "N/A"}
              </Td>
              <Td>
                <span className="flex">
                {hotel.imageUrls?.slice(0, 2).map((image) => (
                  <img
                    className="w-4 h-4 rounded-full"
                    src={image}
                    alt={hotel.name}
                  />
                ))}</span>
              </Td>
              <Td className="w-3 cursor-pointer">
                {/* edit and add buttons  */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard(DashboardHotels);
