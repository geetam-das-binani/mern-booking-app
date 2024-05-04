import * as apiClient from "../api-client";
import { useQuery } from "@tanstack/react-query";
import LatestDestinationCard from "../components/LatestDestinationCard";
const Homepage = () => {
  const { data } = useQuery({
    queryKey: ["hotel"],
    queryFn: apiClient.fetchHotels,
  });

  if (!data?.hotels || data?.hotels?.length === 0) {
    return (
      <span className="text-gray-400 font-bold text-2xl text-center"></span>
    );
  }

  const topRowHotels = data.hotels.slice(0, 2) || [];
  const bottomRowHotels = data.hotels.slice(2) || [];
  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">
        <p className="text-2xl mb-2 ">Most Recent Destinations added by our hosts</p>
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            {
              topRowHotels.map(hotel=>(
                 <LatestDestinationCard 
                 key={hotel._id}
                 hotel={hotel}/>
              ))
            }
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          {
              bottomRowHotels.map(hotel=>(
                 <LatestDestinationCard
                 key={hotel._id}
                 hotel={hotel}/>
              ))
            }
          </div>
        </div>
      </h2>
    </div>
  );
};

export default Homepage;
