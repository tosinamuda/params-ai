import { useAppSelector } from "@/app/redux/hook";
import { trpc } from "@/lib/trpc";
import { selectCurrentToken } from "../../Auth/redux/slice/authSlice";

import { useParams } from "react-router-dom";
import { useDialog } from "../../../shared/hooks/useDialog";
import { ExperimentCard } from "../../Experiment/components/ExperimentCard";
import { PromptWithCategory } from "../../PromptLab/models/Prompt";
import { PromptTemplateBuilderModal } from "../../PromptTemplateBuilder/components/PromptTemplateBuilderModal";

type PrompListProps = {
  prompts: PromptWithCategory[];
};
const PromptList: React.FC<PrompListProps> = ({ prompts }) => {
  return (
    <>
      {prompts.map((prompt) => (
        <div
          key={prompt.id}
          style={{
            opacity: 1,
          }}
        >
          <div
            className=" flex flex-col items-start justify-between rounded-xl p-3.5 md:p-4 xl:p-5 border border-light sm:hover:!border-dark-lightest sm:hover:!border-opacity-30 cursor-pointer h-[160px] sm:h-[180px] md:h-[280px] lg:h-[250px] xl:h-[270px] 3xl:h-[280px] overflow-auto"
            style={{
              backgroundColor: `#ffffff`,
              borderColor: `#333333`,
            }}
          >
            <div className="flex flex-row justify-between w-full h-[30px] xl:h-9 3xl:h-11">
              <div className="flex flex-row max-w-[80%]">
                <div
                  title="generation"
                  className="bg-dark-lightest w-12/12 flex items-center bg-opacity-10 rounded-lg mr-2 p-2 text-dark-lightest border border-dark-lightest border-opacity-10 cursor-auto"
                >
                  <span className="text-ellipsis text-xs xl:text-sm 3xl:text-base leading-3.5 3xl:leading-7">
                    {prompt.category.name}
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r1:"
                data-state="closed"
              >
                <div className="h-[30px] xl:h-9 w-[30px] xl:w-9 -mr-[5px] text-dark flex items-center justify-center text-xl sm:hover:bg-dark sm:hover:bg-opacity-10  rounded-lg cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    ></path>
                  </svg>
                </div>
              </button>
              <button type="button" className="hidden"></button>
            </div>
            <h1
              title={prompt.title}
              className="text-dark text-base sm:text-lg md:text-2xl 2xl:text-3xl 3xl:text-[32px] leading-7 sm:leading-6.5 md:leading-[38px] xl:leading-7.5 2xl:leading-10 3xl:leading-[50px] font-medium"
            >
              {prompt.title}
            </h1>
            <div className="flex flex-row flex-nowrap w-full items-center gap-1.5 xl:gap-[9px]">
              <div className="text-[#1f2b3480] text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] leading-4.5 font-semibold">
                <p className="text-[#1f2b3480] text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] leading-4.5 font-semibold">
                  March 3, 2024
                </p>
              </div>
              <div className="w-px h-3.5 xl:h-3.5 bg-[#1f2b3480]"></div>
              <div className="text-[#1f2b3480] text-[10px] md:text-[11px] lg:text-[10px] xl:text-[11px] leading-4.5 font-semibold">
                2 days ago
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

type AddPromptButtonProps = {
  onClick?: () => void;
};
const AddPromptButton: React.FC<AddPromptButtonProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col bg-light-lightest items-center justify-center border border-light sm:hover:border-primary h-[160px] sm:h-[180px] md:h-[280px] lg:h-[250px] xl:h-[270px] 3xl:h-[280px] rounded-xl p-4 xl:p-5 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[38px] sm:w-[51px] h-[38px] sm:h-[51px] xl:w-[78px] xl:h-[78px] mb-2 sm:mb-2.5 bg-[#0894bf26] text-primary flex items-center justify-center rounded-full">
        <span className="text-primary scale-75 sm:scale-100 xl:scale-[2]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v14m-7-7h14"
            ></path>
          </svg>
        </span>
      </div>
      <h2 className="text-sm sm:text-base md:text-lg xl:text-xl 3xl:text-2xl leading-7 xl:leading-7.5 3xl:leading-10 text-dark font-semibold mb-2 sm:mb-3 lg:mb-3.5 xl:mb-3">
        New prompt
      </h2>
      <p className="text-[#4d5a6680] text-[13px] xl:text-sm 3xl:text-base xl:leading-[21px] 3xl:leading-6 text-center font-medium">
        Create a new prompt for customized <br /> AI interaction
      </p>
    </div>
  );
};

const AddPrompt = () => {
  const token = useAppSelector(selectCurrentToken);

  const { slug } = useParams();
  const { data: prompt } = trpc.prompt.getBySlug.useQuery(slug!, {
    enabled: Boolean(token && slug && slug !== "new"),
  });

  const { data: prompts } = trpc.prompt.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { openDialog, dialogRef, closeDialog } = useDialog();

  return (
    <div className="h-full p-8 bg-[#F9FAFC]">
      <div className="flex-1">
        <div className="">
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-5 md:gap-6 lg:gap-5 xl:gap-y-[30px] 3xl:gap-y-[15px] overflow-y-auto">
              <AddPromptButton onClick={openDialog} />
              {prompts && <PromptList prompts={prompts.prompt} />}
            </div>

            <div className="container pt-16 pb-16 mx-auto pr-8 bg-gray-100">
              <div className="grid grid-cols-3 gap-4">
                {prompts?.prompt?.map((e) => (
                  <ExperimentCard
                    key={e.id}
                    id={e.id}
                    name={e.title}
                    description={e.description}
                    disable={false}
                  />
                ))}
              </div>
            </div>
            <dialog ref={dialogRef} className="dialog">
              <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg p-8">
                  <PromptTemplateBuilderModal onCloseDialog={closeDialog} />
                </div>
              </div>
            </dialog>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddPrompt;
