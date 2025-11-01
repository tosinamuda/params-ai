import React from "react";
import DashboardHeader from "./DashboardHeader";

type DashboardProps = {
  headerComponent?: React.ReactNode; // Component for the header
  sideBarComponent?: React.ReactNode; // Component for the sidebar
};

const Dashboard: React.FC<React.PropsWithChildren<DashboardProps>> = ({
  children,
  headerComponent,
  sideBarComponent,
}) => {
  return (
    <div>
      {headerComponent ?? <DashboardHeader />}
      {sideBarComponent}
      {children}
    </div>
  );
};

export default Dashboard;
