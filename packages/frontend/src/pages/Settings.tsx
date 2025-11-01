import { Dashboard, DashboardSideBar } from "@/features/Dashboard";
import {
  AddCategory,
  AddExperiment,
  AddInterface,
  AddPrompt,
} from "@/features/ExperimentAdmin";
import Tab from "@/shared/components/Tabs";

const ExperimentSettings: React.FC = () => {
  return (
    <Dashboard sideBarComponent={<DashboardSideBar />}>
      <div className="ml-64 pt-16 h-screen overflow-y-auto">
        <Tab
          tabs={[
            {
              key: "interface",
              label: "Interfaces",
              component: <AddInterface />,
            },
            {
              key: "category",
              label: "Categories",
              component: <AddCategory />,
            },
            {
              key: "Prompt",
              label: "Prompts",
              component: <AddPrompt />,
            },
            {
              key: "Experiment",
              label: "Experiments",
              component: <AddExperiment />,
            },
          ]}
          headerClass="sticky top-0 z-20 bg-white border-b border-b-gray-200 shadow-sm"
          bodyClass="h-screen overflow-y-auto no-scrollbar"
          className="bg-white text-black"
        />
      </div>
    </Dashboard>
  );
};
export default ExperimentSettings;
