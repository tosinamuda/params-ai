import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice";
import { PropsWithClassName } from "@/shared/types";
import React from "react";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Experiment } from "../Experiment/types";



export function TaskGroupWidget() {
  const {  taskId } = useParams();
  const token = useAppSelector(selectCurrentToken);
  const { data: experiments } = trpc.experiment.list.useQuery(undefined, {
    enabled: Boolean(token),
  });
  console.log(experiments);


  return (
    <>
      <div className="container mx-auto border-b border-b-gray-200">
        <div className="bg-white  pb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-dmsans font-medium text-black">
              Tosin's Workspace
            </h2>
            <button className="bg-primary-700 text-sm text-white py-2 px-2">
              New Task
            </button>
          </div>
        </div>
      </div>
      <div className="container pb-16 mx-auto pr-8 bg-white">
        {/* <div className="grid grid-cols-3 gap-4">
          {showExperiment &&
            experiments?.map((e) => <ExperimentCard key={e.id} {...e} />)}
          {showExperiment &&
            experimentFillers.map((e) => (
              <ExperimentCard key={e.id} disable={true} {...e} />
            ))}
        </div> */}
        <TaskGroupSections />
      </div>
    </>
  );
}

export function TaskGroupSections() {
  return (
    <>
      {["Generation", "Brainstorming"].map((value) => (
        <TaskGroupSection category={value} key={value} />
      ))}
    </>
  );
}

type TaskGroup = {
  category: string;
};
const TaskGroupSection: React.FC<PropsWithClassName & TaskGroup> = ({
  className,
  category,
}) => {
  const tasks = [
    "Social Media Generation",
    "Business Idea Naming",
    "Personal Generation",
  ];
  const interfaces = ["Chat", "Form"];
  return (
    <div
      className={twMerge(
        "bg-white border border-gray-200 rounded-lg shadow mt-8",
        className
      )}
    >
      <div className="flex flex-row bg-[#F3F4F6] text-black font-medium px-4 py-4">
        {category}
      </div>
      <div className="grid grid-cols-[auto_1fr] py-2 ">
        {tasks.map((task, parentIndex) => (
          <>
            <div
              className={twMerge(
                "task-col flex flex-col text-black font-medium py-2 pl-4 border-b border-b-gray-200 pr-4",
                parentIndex == tasks.length - 1 && "border-none"
              )}
            >
              {task}
            </div>
            <div
              className={twMerge(
                "subtask-col grid grid-cols-[auto_auto_1fr_1fr_1fr_1fr] gap-2 border-b border-b-gray-200 py-2",
                parentIndex == tasks.length - 1 && "border-none"
              )}
            >
              {interfaces.map((colValue, childIndex) => (
                <>
                  <div
                    key={colValue}
                    className="flex flex-row items-center justify-center"
                  >
                    <div className="inline-flex items-center justify-center h-5 w-5 px-2 border border-green-500 rounded">
                      <span className="text-xs text-violet-400 text-center">
                        {parentIndex * 2 + childIndex + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    <span className="bg-violet-300/30 text-black rounded text-xs  font-medium px-4 py-1.5">
                      {colValue} interface
                    </span>
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    20:00 - 22:00
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    30 Minutes
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    Pending
                  </div>
                  <div className="flex flex-row justify-center items-center">
                    start
                  </div>
                </>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
