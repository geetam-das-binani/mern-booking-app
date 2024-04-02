import { useQuery } from "@tanstack/react-query"
import * as apiClient from '../api-client'

const MyBookings = () => {
 const {data:myBookings}= useQuery({
    queryKey: ["myBookings"],
    queryFn:apiClient.fetchMyBookings,
  })
  console.log(myBookings);
  
  
  return (
    <div>
     {
      myBookings?.hotel?.map((hotel)=>{
        return (
          <div key={hotel._id}>
            {hotel.name}
          </div>
        )
      })
     }
    </div>
  )
}

export default MyBookings
