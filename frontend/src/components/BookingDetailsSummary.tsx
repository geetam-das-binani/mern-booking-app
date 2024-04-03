


type Props = {
  hotel: {
    _id: string;
    name: string;
    country: string;
    desc: string;
    city: string;
    type: string;
    adultCount: number;
    childCount: number;
    imageUrls: string[];
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    lastUpdated: Date;
  };
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
};

const BookingDeatilsSummary = ({
  adultCount,
  childCount,
  checkIn,
  checkOut,
  hotel,
  numberOfNights,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2>Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">
          {`${hotel?.name}, ${hotel?.city}, ${hotel?.country}`}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold">{new Date(checkIn).toDateString()}</div>
        </div>
        <div>
          Check-Out
          <div className="font-bold">{new Date(checkOut).toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of Stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div >
        Guests
        <div className="font-bold">{adultCount} adults
        & {childCount} children</div>
       
        
      </div>
    </div>
  );
};

export default BookingDeatilsSummary;
