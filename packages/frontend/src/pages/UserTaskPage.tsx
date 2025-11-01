import { Dashboard, DashboardHeader } from "@/features/Dashboard/";
import { ChatInterface, FormInterface } from "@/features/Task/Interfaces";
import Tab from "@/shared/components/Tabs";

const UserTaskPage: React.FC = () => {
  //return (<TaskDashboard />);
  return (
    <Dashboard
      headerComponent={<DashboardHeader className="border-none shadow-none" />}
    >
      <Tab
        tabs={[
          { key: "chat", label: "Chat", component: <ChatInterface /> },
          { key: "form", label: "Form", component: <FormInterface /> },
        ]}
        headerClass="sticky top-16 z-20 bg-white border-b border-b-gray-200 shadow-sm"
        bodyClass="pt-16 h-screen overflow-y-auto no-scrollbar"
        className="bg-white text-black"
      />
    </Dashboard>
  );
};

export default UserTaskPage;
