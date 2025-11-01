import { trpc } from "@/lib/trpc";
import { PromptTemplateView } from "@/features/PromptLab/PromptTemplateView";
import { extractPromptTemplate } from "@/features/PromptLab/utils";
import { useState } from "react";
import {
  LeftPanel,
  PanelHeader,
  RightPanel,
  TemplateBuilderScreen,
} from "./TemplateBuilderContainer";

type PromptDetailFormStepProps = {
  step: number;
  nextStep?: () => void;
  prevStep?: () => void;
  promptTemplate?: string | { readonly locked: boolean };
  user?: ({ id: number } & Record<string, unknown>) | null;
  token?: string | null;
};
export const PromptDetailFormStep: React.FC<PromptDetailFormStepProps> = ({
  promptTemplate,
  user,
  token,
}) => {
  const [formRecord, setFormRecord] = useState({ name: "", categoryId: -1 });

  const onFormChange =
    (key: keyof typeof formRecord) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const newValue = event.target.value;
      setFormRecord((prevFormRecord) => ({
        ...prevFormRecord,
        [key]: key === "categoryId" ? Number(newValue) : newValue,
      }));
    };

  const { data: categories } = trpc.promptCategory.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { mutate: doAddPrompt, isPending: isAddPromptLoading } =
    trpc.prompt.create.useMutation();

  const onPromptCreate = (status: boolean) => () => {
    const isValidForm = [
      Boolean(promptTemplate),
      formRecord.categoryId !== -1,
      user?.id,
    ].every(Boolean);

    if (isValidForm) {
      doAddPrompt(
        {
          title: formRecord.name,
          categoryId: formRecord.categoryId,
          publish_status: status,
          content: promptTemplate?.toString() ?? "",
          authorId: user?.id ?? -1,
        },
        {}
      );
    }
  };

  return (
    <TemplateBuilderScreen>
      <div className="flex-1 flex flex-row overflow-y-hidden">
        <LeftPanel>
          <PanelHeader
            title="One Final Step"
            description="Customize the look of your no-code prompt-based app, write your app name, choose the prompt category and publish or save as draft."
          />
          <div className="flex-1 flex flex-col" style={{ opacity: 1 }}>
            <form className="flex flex-col flex-1">
              <div className="px-4 py-4 flex flex-col justify-center">
                <div className="mt-2 mb-4 first:mt-0">
                  <label className="block text-sm leading-5 font-medium leading-6 text-gray-900 text-[#1f2b34a6] text-[13px] sm:text-xs md:text-[13px] xl:text-sm 2xl:text-[15px] leading-5 sm:leading-4.5 md:leading-5.5 xl:leading-5.5 2xl:leading-5 font-medium">
                    Give this template a name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                      value={formRecord.name}
                      onChange={onFormChange("name")}
                    />
                  </div>
                </div>

                <div className="mt-2 mb-4 first:mt-0">
                  <label className="block text-sm leading-5 font-medium leading-6 text-gray-900 text-[#1f2b34a6] text-[13px] sm:text-xs md:text-[13px] xl:text-sm 2xl:text-[15px] leading-5 sm:leading-4.5 md:leading-5.5 xl:leading-5.5 2xl:leading-5 font-medium">
                    Choose Category for prompt
                  </label>
                  <div className="mt-1">
                    <select
                      value={formRecord.categoryId}
                      onChange={onFormChange("categoryId")}
                      className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                    >
                      <option value={-1}>Select Category</option>
                      {categories?.map((c) => (
                        <option value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="h-1 border-b border-gray-200 mb-4"></div>
                <div className="relative flex-1 ">
                  <label className="block text-sm leading-5 font-medium leading-6 text-gray-900 text-[#1f2b34a6] text-[13px] sm:text-xs md:text-[13px] xl:text-sm 2xl:text-[15px] leading-5 sm:leading-4.5 md:leading-5.5 xl:leading-5.5 2xl:leading-5 font-medium">
                    Prompt Template
                  </label>
                  <div className="mt-1 border border-gray-200 p-1 rounded-lg">
                    <PromptTemplateView
                      promptTemplate={
                        extractPromptTemplate(promptTemplate) ?? ""
                      }
                      showToggle={false}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </LeftPanel>

        <RightPanel>
          <PanelHeader
            title="App Title"
            description="Reuse your prompt through no-code form app generated from your prompt template"
          />

          <div className="flex-1 flex flex-col" style={{ opacity: 1 }}>
            <form className="flex flex-col flex-1">
              <div className="flex flex-col flex-1">
                <div className="flex w-full flex-col font-body font-normal leading-[18px] flex-1">
                  <div className="flex items-center justify-between"></div>
                  <div className="relative flex-1 ">
                    <PromptTemplateView
                      promptTemplate={
                        extractPromptTemplate(promptTemplate) ?? ""
                      }
                      showToggle={false}
                      defaultView="FORM"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </RightPanel>
      </div>
      <div className="flex flex-row  px-5 md:px-7.5 lg:px-10 xl:px-12.5 py-3 md:py-3.75 border-t border-light">
        <div className="w-full flex flex-row items-center gap-4"></div>
        <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full">
          {promptTemplate && (
            <>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-violet-700 text-white shadow-sm hover:bg-violet-700/70 h-9 px-4 py-2"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r5u:"
                data-state="closed"
                onClick={onPromptCreate(false)}
              >
                Save Draft
              </button>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-violet-700 text-white shadow-sm hover:bg-violet-700/70 h-9 px-4 py-2"
                type="button"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-:r5u:"
                data-state="closed"
                onClick={onPromptCreate(true)}
              >
                Publish
              </button>
            </>
          )}
        </div>
      </div>
    </TemplateBuilderScreen>
  );
};
