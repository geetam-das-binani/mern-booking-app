import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import Dashboard from "./Dashboard";
import { Fragment } from "react/jsx-runtime";
import DeleteReviewModal from "../AdminModal/DeleteReviewModal";

const DashBoardReviews = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isError, error } = useQuery({
    queryFn: apiClient.getAllReviews,
    queryKey: ["reviews"],
  });

  if (isError || data?.length === 0) {
    return <div>{error?.message || "Something went wrong"}</div>;
  }

  return (
    <TableContainer className="overflow-y-scroll">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Review Id</Th>
            <Th>comment</Th>
            <Th>name</Th>
            <Th>posted on</Th>
            <Th>rating</Th>
            <Th>action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((hotel) => (
            <Fragment key={hotel._id}>
              {hotel?.reviews.map((review) => (
                <Tr key={review._id}
                className="hover:bg-blue-600 hover:text-white
                 font-semibold duration-300 ">
                  <Td className="w-4">{review._id}</Td>
                  <Td className="w-4">{review.comment}</Td>
                  <Td className="w-4">{review.name}</Td>

                  <Td className="w-4">
                    {" "}
                    {review?.createdAt
                      ? new Date(review.createdAt).toDateString()
                      : "N/A"}
                  </Td>
                  <Td
                    
                    
                    className={`text-center w-1
                  ${review.rating >= 4 ? "text-green-600" : "text-red-600"}
                  `}
                  >
                    {review.rating}
                  </Td>
                  <Td className="w-3 cursor-pointer">
                    <DeleteReviewModal
                      isOpen={isOpen}
                      onOpen={onOpen}
                      onClose={onClose}
                      reviewId={review._id || ""}
                      hotelId={hotel._id || ""}
                    />
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

export default Dashboard(DashBoardReviews);
