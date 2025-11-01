import { prompts } from "@/features/PromptLab/hooks/constant";
import { PromptTemplateView } from "@/features/PromptLab/PromptTemplateView";
import { extractPromptTemplate } from "@/features/PromptLab/utils";
import TextSkeleton from "@/shared/components/TextSkeleton";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { match } from "ts-pattern";
import {
  LeftPanel,
  PanelHeader,
  RightPanel,
  TemplateBuilderScreen,
} from "./TemplateBuilderContainer";

type PromptGeneralizationStepProps = {
  step: number;
  nextStep?: () => void;
  prevStep?: () => void;
  promptTemplate?: string | { readonly locked: boolean };
  onGenerate: (prompt: string) => React.MouseEventHandler<HTMLButtonElement>;
  isPromptTemplatePending: boolean;
  isPromptTemplateSuccess: boolean;
};
export const PromptGeneralizationStep: React.FC<
  PromptGeneralizationStepProps
> = ({
  step,
  nextStep,
  promptTemplate,
  onGenerate,
  isPromptTemplatePending,
  isPromptTemplateSuccess,
}) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const onClickExample = (index: number) => () => {
    setCurrentPromptIndex(index);
    setPrompt(prompts[index].content);
  };
  const inputElement = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);
  const [prompt, setPrompt] = useState(prompts[0].content);

  const onChangePrompt = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <TemplateBuilderScreen>
      <div className="flex-1 flex flex-row overflow-y-hidden">
        <LeftPanel>
          <PanelHeader
            title="Let's start with a working prompt"
            description="Convert your prompt to a reusable prompt template that works by extracting replaceable slots in your prompt."
          >
            {prompts.map((p, i) => (
              <button
                key={p.title}
                className={twMerge(
                  "py-1 px-3 bg-primary hover:bg-primary/70 text-white text-xs mr-2 last:mr-0 rounded-2xl disabled:pointer-events-none disabled:bg-white disabled:text-primary disabled:border disabled:border-primary"
                )}
                disabled={currentPromptIndex == i}
                onClick={onClickExample(i)}
              >
                {p.title}
              </button>
            ))}
          </PanelHeader>
          <div className="flex-1 flex flex-col" style={{ opacity: 1 }}>
            <form className="flex flex-col flex-1">
              <div className="flex flex-col flex-1">
                <div className="flex w-full flex-col font-body font-normal leading-[18px] flex-1">
                  <div className="flex items-center justify-between"></div>
                  <div className="relative flex-1">
                    <textarea
                      ref={inputElement}
                      value={prompt}
                      onChange={onChangePrompt}
                      autoFocus
                      placeholder="e.g. Help me compose a professional email introducing my services to a prospective client"
                      maxLength={1500}
                      className="!text-[13px] sm:!text-sm md:!text-base text-[#1f2b34] sm:p-3 min-h-[5rem] font-normal !leading-5 sm:!leading-5 w-full rounded-xl
                          border-0 outline-none ring-0 focus:ring-0 transition-all duration-300 ease-in-out
                          placeholder:text-light-darkest
                          resize-none h-full min-h-[100%] mb-6
                          !px-0 !overflow-y-auto no-scrollbar caret-violet-700"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </LeftPanel>
        <RightPanel>
          <PanelHeader
            title="Prompt Template"
            description="Create a prompt template by wrapping {{}} around a potential prompt variable. For example {{location}}"
          />

          <div className="flex-1 flex flex-col" style={{ opacity: 1 }}>
            <form className="flex flex-col flex-1">
              <div className="flex flex-col flex-1">
                <div className="flex w-full flex-col font-body font-normal leading-[18px] flex-1">
                  <div className="flex items-center justify-between"></div>
                  <div className="relative flex-1 ">
                    {match({
                      promptTemplate,
                      isPromptTemplatePending,
                      isPromptTemplateSuccess,
                    })
                      .with({ isPromptTemplateSuccess: true }, () => (
                        <>
                          <PromptTemplateView
                            promptTemplate={
                              extractPromptTemplate(promptTemplate) ?? ""
                            }
                            showToggle={true}
                          />
                        </>
                      ))
                      .with({ isPromptTemplatePending: true }, () => (
                        <TextSkeleton />
                      ))
                      .otherwise(() => (
                        <></>
                      ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </RightPanel>
      </div>
      <div className="flex flex-row  px-5 md:px-7.5 lg:px-10 xl:px-12.5 py-3 md:py-3.75 border-t border-light">
        <div className="w-full flex flex-row items-center gap-4">
          <span className="text-xs sm:text-sm text-dark-lightest">
            {prompt.length}/1500 Characters
          </span>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-violet-700 text-white shadow-sm hover:bg-violet-700/70 h-9 px-4 py-2"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r5u:"
            data-state="closed"
            onClick={onGenerate(prompt)}
          >
            Generate Template
          </button>
        </div>
        <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full">
          {promptTemplate && (
            <>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r5u:"
                data-state="closed"
                onClick={nextStep}
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </TemplateBuilderScreen>
  );
};
