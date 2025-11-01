import { useAppSelector } from "@/app/redux/hook";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/features/Auth/redux/slice/authSlice";
import { RouterOutput, trpc } from "@/lib/trpc";
import ListSkeleton from "@/shared/components/ListSkeleton";
import { PropsWithClassName } from "@/shared/types";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function TaskGroupWidget() {
  const { experimentId } = useParams();
  const token = useAppSelector(selectCurrentToken);

  const userObj = useAppSelector(selectCurrentUser) as { email: string };
  const { data: user } = trpc.user.getByEmail.useQuery(
    { email: userObj?.email },
    {
      enabled: Boolean(!!token && !!userObj?.email),
    }
  );

  const { data: experiment, isPending: isExperimentPending } =
    trpc.experiment.getById.useQuery(experimentId as string, {
      enabled: Boolean(!!token && !!experimentId),
    });

  const {
    mutate: doTaskCreateParticipation,
    isPending: isParticipationCreateLoading,
  } = trpc.task.createBulk.useMutation();

  const onParticipate = () => {
    /*
     TODO:
     - Disable Participate button if participation record exists,
     - Disable participate until experiment is loaded
     - Disable Tasks by default
     - Enable on participate successful
     - On participate create participate record for each task
     - */

    if (experimentId && user?.id) {
      doTaskCreateParticipation({
        experimentId: Number(experimentId),
        userId: user.id,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto border-b border-b-gray-200">
        <div className="bg-white  pb-4">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-dmsans font-medium text-black">
              Tosin's Workspace
            </h2>
            <button
              className="bg-primary-700 text-sm text-white py-2 px-4"
              onClick={onParticipate}
              disabled={isParticipationCreateLoading}
            >
              Participate
            </button>
          </div>
        </div>
      </div>
      <div className="container pb-16 mx-auto pr-8 bg-white">
        {isExperimentPending && (
          <div className="my-4 flex flex-col gap-4">
            <ListSkeleton />
            <ListSkeleton />
          </div>
        )}
        {experiment && <TaskGroupSections experiment={experiment} />}
      </div>
    </>
  );
}

type TaskGroupSectionProps = {
  experiment: NonNullable<RouterOutput["experiment"]["getById"]>;
};

export function TaskGroupSections({ experiment }: TaskGroupSectionProps) {
  const categories = experiment.categoryPromptMap as Record<
    string,
    Array<{ id: number; title: string }>
  >;

  const interfaces = experiment.interfaces;

  return (
    <>
      {Object.keys(categories).map((c) => (
        <TaskGroupSection
          category={c}
          key={c}
          tasks={categories[c].map((t) => t.title)}
          interfaces={interfaces}
        />
      ))}
    </>
  );
}

type TaskGroup = {
  category: string;
  tasks: string[];
  interfaces: string[];
};
const TaskGroupSection: React.FC<PropsWithClassName & TaskGroup> = ({
  className,
  category,
  tasks,
  interfaces,
}) => {
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
                    <Link to="/experiment/task/1">start</Link>
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
