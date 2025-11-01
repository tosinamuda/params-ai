import { useAppSelector } from "@/app/redux/hook";
import {
  metaPromptKey,
  prompts,
  promptTemplateMetaPrompt,
} from "@/features/PromptLab/hooks/constant";
import { PromptTemplateView } from "@/features/PromptLab/PromptTemplateView";
import {
  extractPromptTemplate,
  preparePrompt,
} from "@/features/PromptLab/utils";
import { trpc } from "@/lib/trpc";
import TextSkeleton from "@/shared/components/TextSkeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { z } from "zod";
import { selectCurrentToken } from "../../Auth/redux/slice/authSlice";

const PromptGeneralizationSchema = z.object({
  prompt: z.string().min(2),
});
type PromptGeneralizationType = z.infer<typeof PromptGeneralizationSchema>;

const GeneralizePrompt = () => {
  const token = useAppSelector(selectCurrentToken);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PromptGeneralizationType>({
    resolver: zodResolver(PromptGeneralizationSchema),
    defaultValues: {
      prompt: prompts[0].content,
    },
  });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<PromptGeneralizationType> = (data) => {
    const { prompt } = data;

    const input = preparePrompt({
      template: promptTemplateMetaPrompt,
      keyword: metaPromptKey,
      replacement: prompt,
    });

    doLLMInferencing({ prompt: input });
  };

  const {
    data: promptTemplate,
    isPending: isPromptTemplatePending,
    isSuccess: isPromptTemplateSuccess,
    mutate: doLLMInferencing,
  } = trpc.inference.completion.useMutation();

  return (
    <div className="h-full p-8 bg-[#F9FAFC]">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white flex flex-col items-center px-4 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="flex flex-col px-2 py-2">
            <h2 className="text-lg font-semibold">Generalize Prompt</h2>
            <p className="text-sm text-[#415163] mt-1">
              Make prompt reusable by identifying replaceable
              variables/parameters for other usecase
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="flex flex-col flex-1">
                <div className="flex flex-col flex-1">
                  <div className="flex w-full flex-col font-body font-normal leading-[18px] flex-1">
                    <div className="mt-1.5">
                      <label
                        htmlFor="name"
                        className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                      >
                        Original Prompt
                      </label>
                      <div className="mt-1">
                        {errors.prompt && (
                          <span className="text-sm text-red-400">
                            {errors.prompt.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-1 w-full border border-violet-300 rounded shadow-sm py-2 px-2 whitespace-pre-wrap">
                      <textarea
                        {...register("prompt")}
                        autoFocus
                        placeholder="e.g. Help me compose a professional email introducing my services to a prospective client"
                        maxLength={1500}
                        className="text-base text-[#415163] text-[#1f2b34] tracking-tight
                        w-full  min-h-[23rem]  max-h-[30rem] p-[unset]
                        border-0 outline-none ring-0 focus:ring-0
                        resize-none !overflow-y-auto no-scrollbar caret-violet-700"
                      ></textarea>
                    </div>
                    <div className="mt-1">
                      {errors.prompt && (
                        <span className="text-sm text-red-400">
                          {errors.prompt.message}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-row items-center justify-end mt-2">
                      <button
                        className="py-2 px-5 rounded bg-indigo-500 text-center text-white hover:text-indigo-800 hover:bg-white hover:outline-violet-400"
                        type="submit"
                        disabled={isPromptTemplatePending}
                      >
                        Generalize
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="px-4 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="px-2 py-2 w-full">
            <h2 className="text-lg font-semibold">
              Preview Generalized Prompt
            </h2>
            <div className="flex-1 flex flex-col" style={{ opacity: 1 }}>
              <form className="flex flex-col flex-1">
                <div className="flex flex-col flex-1">
                  <div className="flex flex-col w-full  font-body font-normal leading-[18px] flex-1 gap-x-4">
                    <div className="relative flex-1 ">
                      {match({
                        promptTemplate,
                        isPromptTemplatePending,
                        isPromptTemplateSuccess,
                      })
                        .with({ isPromptTemplateSuccess: true }, () => (
                          <div className="mt-8 border border-gray-200 rounded p-4 bg-white">
                            <PromptTemplateView
                              className="min-h-20"
                              promptTemplate={
                                extractPromptTemplate(promptTemplate) ?? ""
                              }
                              showToggle={true}
                            />
                          </div>
                        ))
                        .with({ isPromptTemplatePending: true }, () => (
                          <div className="h-[30rem] mt-8 border border-gray-200 rounded p-4">
                            <TextSkeleton />
                          </div>
                        ))
                        .otherwise(() => (
                          <div className="h-[30rem] mt-8 border border-gray-200 rounded"></div>
                        ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GeneralizePrompt;
