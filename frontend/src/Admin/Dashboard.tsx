import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = (WrappedComponent: React.ComponentType<{}>) => () => {
  return (
    <div
      className="grid
    grid-cols-1
    md:grid-cols-[1fr_3fr]
    sm:grid-cols-1
    border border-slate-400
    p-1
    
    "
    >
      <Sidebar />
      <div className="overflow-y-scroll overflow-hidden h-[400px] w-[920px] relative">
        <WrappedComponent />
      </div>
    </div>
  );
};
export default Dashboard;
