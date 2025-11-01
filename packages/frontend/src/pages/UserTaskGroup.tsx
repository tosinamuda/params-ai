import { Dashboard, DashboardSideBar } from "@/features/Dashboard";
import { TaskGroupWidget } from "@/features/Task/TaskGroupWidget";

const UserTaskGroup: React.FC = () => {
  return (
    <Dashboard sideBarComponent={<DashboardSideBar />}>
      <div className="ml-64 pt-20 h-screen overflow-y-auto">
        <TaskGroupWidget />
      </div>
    </Dashboard>
  );
};
export default UserTaskGroup;
