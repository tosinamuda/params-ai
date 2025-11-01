import { Dashboard, DashboardSideBar } from "@/features/Dashboard";
import {
  DiscoverPrompt,
  GeneralizePrompt,
  PreviewPrompt,
  ReusePrompt,
} from "@/features/ExperimentParticipant";
import Tab from "@/shared/components/Tabs";

const ParticipantTask: React.FC = () => {
  return (
    <Dashboard sideBarComponent={<DashboardSideBar />}>
      <div className="ml-64 pt-16 h-screen overflow-y-auto">
        <Tab
          tabs={[
            {
              key: "discovery",
              label: "Discover",
              component: <DiscoverPrompt />,
            },
            {
              key: "generalize",
              label: "Generalize",
              component: <GeneralizePrompt />,
            },
            {
              key: "preview",
              label: "Preview",
              component: <PreviewPrompt />,
            },
            {
              key: "reuse1",
              label: "Reuse 1",
              component: <PreviewPrompt />,
            },
            {
              key: "reuse2",
              label: "Reuse 2",
              component: <PreviewPrompt />,
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
export default ParticipantTask;
