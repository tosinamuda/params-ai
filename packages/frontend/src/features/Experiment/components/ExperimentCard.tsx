import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Experiment } from "../types";

type ExperimentProps = Omit<Experiment, "prompts"> & { disable?: boolean };

export const ExperimentCard: React.FC<ExperimentProps> = (p) => {
  return (
    <Link
      className={twMerge(
        "bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100 cursor-pointer",
        p.disable ? "opacity-40  pointer-events-none" : "group"
      )}
      to={`/experiment/${p.id}`}
    >
      <div className="flex items-stretch justify-center">
        <div className="bg-white  flex flex-col justify-between">
          {/* First Section (80% height) */}
          <div className="flex-1 border-b border-b-gray-200  p-4">
            {/* Content for the first section */}
            <h2 className="text-base font-semibold mb-1 group-hover:underline group-hover:text-violet-500">
              {p.name}
            </h2>
            <p className="text-[#686868] text-sm">
              {p.description ??
                `This experiment on ${p.name} will involve carrying out some task using LLM prompts.`}
            </p>
          </div>
          {/* Second Section (20% height) */}
          <div className="flex-1 h-[10%] bg-[#F5F8FA] p-4">
            <div className="flex flex-row justify-between text-[#686868]">
              <img src="/images/entropy.png" className="w-8 aspect-square" />
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
