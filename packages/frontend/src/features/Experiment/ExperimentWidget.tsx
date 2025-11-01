import { useAppSelector } from "@/app/redux/hook";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice";
import { trpc } from "@/lib/trpc";
import { DashboardSection } from "@/features/Dashboard";
import { ExperimentCard } from "./components/ExperimentCard";
import { Experiment } from "./types";

const experimentFillers: Experiment[] = [
  { id: 2, name: "Repetitive Task Study", description: null, prompts: [] },
  { id: 3, name: "Social Media Simulation", description: null, prompts: [] },
  { id: 4, name: "2048 Game with LLM", description: null, prompts: [] },
  { id: 5, name: "Survey Q&A", description: null, prompts: [] },
  { id: 6, name: "Need-finding Study", description: null, prompts: [] },
];

export function ExperimentWidget() {
  const token = useAppSelector(selectCurrentToken);
  const { data: experiments } = trpc.experiment.list.useQuery(undefined, {
    enabled: Boolean(token),
  });
  const showExperiment = Array.isArray(experiments) && experiments.length > 0;
  return (
    <>
      <div className="container mx-auto border-b border-b-gray-200">
        <div className="bg-white  pb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-dmsans font-medium text-black">
              Tosin's Workspace
            </h2>
            <button className="bg-primary-700 text-sm text-white py-2 px-2">
              New Experiment
            </button>
          </div>
        </div>
      </div>
      <div className="container pt-16 pb-16 mx-auto pr-8 bg-gray-100">
        {/* Your dashboard content goes here */}
        <div className="grid grid-cols-3 gap-4">
          {showExperiment &&
            experiments?.map((e) => <ExperimentCard key={e.id} {...e} />)}
          {showExperiment &&
            experimentFillers.map((e) => (
              <ExperimentCard key={e.id} disable={true} {...e} />
            ))}
        </div>

        <DashboardSection />
      </div>
    </>
  );
}
