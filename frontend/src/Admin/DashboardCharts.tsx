import { useQuery } from "@tanstack/react-query";
import DashBoard from "./Dashboard";
import * as apiClient from "../api-client";
import { Bar as BarsChart } from "react-chartjs-2";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from "recharts";
import {CategoryScale,Chart as ChartJS,LinearScale,BarElement, Tooltip as BarToolTip,Title,Legend} from 'chart.js'; 
ChartJS.register(CategoryScale,LinearScale,BarElement,BarToolTip ,Title,Legend);
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const DashboardCharts = () => {
  const { data: dashboardData } = useQuery({
    queryKey: ["stats"],
    queryFn: apiClient.gettDashBoardData,
  });

  const hotelData = dashboardData?.hotels
    ? dashboardData.hotels.map((i: any) => ({
        name: i.name,
        amt: i.pricePerNight,
      }))
    : [];
  const bookingsData = dashboardData?.bookings
    ? dashboardData.bookings.map((i: any) => ({
        name: `Booked on ${new Date(i.createdAt).toLocaleDateString()}`,
        amt: i.totalPrice,
      }))
    : [];
  const reviewsData = dashboardData?.reviews
    ? dashboardData.reviews.map((i: any) => ({
        name: `Reviewed By ${i.name}`,
        amt: i.rating,
      }))
    : [];
    const calculateDays =
     (date: Date) =>
     (new Date().getTime() - new Date(date).getTime()) 
     / (24 * 60 * 60 * 1000);

  const usersData = dashboardData?.users
    ? dashboardData?.users.map((i: any) => ({
        name: `${i.firstName} ${i.lastName}`,
        
        joinedBefore:Math.ceil(Math.abs(calculateDays(i.createdAt)))
      }))
    : [];

    const generateRandomBackgroundColor = () => {
      const colorsArr = [];
      const letters = "0123456789ABCDEF";
    
      for (let i = 0; i < usersData.length; i++) {
        let color = "#";
        for (let j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        colorsArr.push(color);
      }
      return colorsArr;
    };
    
    const generateRandomBorderColor = () => {
      const colorsArr = [];
      const letters = "0123456789ABCDEF";
    
      for (let i = 0; i < usersData.length; i++) {
        let color = "#";
        for (let j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        colorsArr.push(color);
      }
      return colorsArr;
    };
  const data = {
    labels: usersData.map((i: any) => i.name),
    datasets: [
      {
        label: "Joined Before days",
        data: usersData.map((i: any) => i.joinedBefore),
        backgroundColor: generateRandomBackgroundColor(),
       borderColor: generateRandomBorderColor(),
        borderWidth: 1,
      },
    ],
  };

  const getPath = (x: number, y: number, width: number, height: number) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
      ${x + width / 2}, ${y}
      C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
      Z`;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <>
      <h2 className="text-center text-3xl font-bold">Hotels</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={hotelData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis dataKey="amt" />
          <Tooltip />
          <Area type="monotone" dataKey="amt" stroke="#FF8042'" fill="blue" />
        </AreaChart>
      </ResponsiveContainer>
      <h2 className="text-center text-3xl font-bold">Bookings</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={bookingsData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="amt"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <h2 className="text-center text-3xl font-bold">Reviews</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={reviewsData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="amt"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {reviewsData.map((_: any, index: number) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <h2 className="text-center text-3xl font-bold">Users</h2>
      <ResponsiveContainer width="100%" height="100%">
      <BarsChart data={data} />
      </ResponsiveContainer>
    </>
  );
};

export default DashBoard(DashboardCharts);
