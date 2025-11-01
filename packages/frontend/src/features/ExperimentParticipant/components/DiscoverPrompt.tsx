import { useAppSelector } from "@/app/redux/hook";
import ChatSend from "@/assets/svg/ChatSend";
import { prompts } from "@/features/PromptLab/hooks/constant";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { selectCurrentToken } from "../../Auth/redux/slice/authSlice";
import { useAutoResizeTextArea } from "../hooks/useAutoResizeTextArea";

const InterfaceSchema = z.object({
  name: z.string().min(2),
});
type InterfaceSchemaType = z.infer<typeof InterfaceSchema>;

const AddInterface = () => {
  const token = useAppSelector(selectCurrentToken);
  const utils = trpc.useUtils();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterfaceSchemaType>({ resolver: zodResolver(InterfaceSchema) });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<InterfaceSchemaType> = (data) => {};

  const { textareaRef } = useAutoResizeTextArea();

  return (
    <div className="h-full p-8 bg-[#F9FAFC]">
      <div className="grid grid-cols-2 gap-4">
        <div className="px-8 py-4  ">
          <div className="px-4 py-4  w-full">
            <h2 className="text-lg font-semibold">
              Discover Prompt for a Task
            </h2>
            <p className="text-sm text-[#415163] mt-1">
              For this experiment, type out the same prompt you have been given
              on the right into the chatbot and send.&nbsp;
              <span className="italic">
                Do not copy and paste, type instead
              </span>
            </p>

            <div className="mt-8 text-base text-[#415163] tracking-tight w-full border border-violet-300 rounded shadow-sm py-4 px-4 whitespace-pre-wrap">
              {prompts[0].content}
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center px-8 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="flex flex-col px-4 py-4">
            <h2 className="text-lg font-semibold">
              Type Original Prompt Into the Chat
            </h2>

            <div className="h-[30rem] mt-8 bg-gray-200 flex flex-col shadow-sm">
              <div className="flex-1 bg-white border border-gray-200"></div>
              <div className="border border-indigo-400 focus-within:border-indigo-700">
                <form className="flex flex-col">
                  <div className="flex">
                    <div className="flex flex-col flex-1">
                      <textarea
                        ref={textareaRef}
                        rows={1}
                        className="h-full m-0 px-0.5 resize-none max-h-[25dvh] max-h-52 text-sm outline-none ring-0 focus-visible:ring-0 focus:ring-0 border-0"
                      ></textarea>
                    </div>
                    <button className="bg-indigo-500 text-center text-white hover:text-indigo-800">
                      <ChatSend className="" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInterface;
