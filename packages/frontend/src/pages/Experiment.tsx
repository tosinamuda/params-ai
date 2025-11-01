import { Dashboard, DashboardSideBar } from "@/features/Dashboard";
import { ExperimentWidget } from "../features/Experiment/ExperimentWidget";

const Experiment: React.FC = () => {
  return (
    <Dashboard sideBarComponent={<DashboardSideBar />}>
      <div className="ml-64 pt-20 h-screen overflow-y-auto">
        <ExperimentWidget />
      </div>
    </Dashboard>
  );
};

export default Experiment;
