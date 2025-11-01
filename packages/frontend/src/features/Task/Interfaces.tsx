import CodeMirror from "@uiw/react-codemirror";
import { PromptFormPreview } from "../PromptLab/PromptFormPreview";
import { PromptOutputSection } from "../PromptLab/PromptOutputSection";
import { PromptTextInput } from "../PromptLab/PromptTextInput";
import { defaultPrompt } from "../PromptLab/hooks/constant";
import usePrompt from "../PromptLab/hooks/usePrompt";

export function FormInterface() {
  const {
    formInputs,
    prompt,
    onPreviewFormChange,
    onPromptEditorChange,
    extensions,
    basicSetupOptions,
    completion,
    generateCompletion,
    isCompletionLoading,
  } = usePrompt({ prompt: defaultPrompt });
  return (
    <>
      <div className="bg-white  w-[31rem] py-6 px-8 fixed left-0 top-20 bottom-0 overflow-y-auto border-r border-r-gray-200 pt-16 no-scrollbar">
        <h2 className="text-base font-semibold text-back">
          Social Media Content Generator
        </h2>
        <h3 className="text-base font-semibold text-back mb-1 mt-8">Prompt</h3>
        <PromptTextInput className="border border-gray-200 rounded-sm shadow-sm">
          <CodeMirror
            autoFocus
            value={prompt}
            height="100%"
            width="100%"
            basicSetup={basicSetupOptions}
            extensions={extensions}
            onChange={onPromptEditorChange}
          />
        </PromptTextInput>
      </div>
      <div className="ml-[31rem] p-8 flex-1 bg-[#F9FAFC]">
        <div className="relative">
          <section>
            <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
              {/* <div className="md:hidden"></div> */}
              <div className="hidden h-full flex-col md:flex">
                <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                  <h2 className="text-lg font-semibold">
                    Social Media Content Generator
                  </h2>
                </div>
                <div
                  role="none"
                  className="shrink-0 bg-border h-[1px] w-full"
                ></div>
                <div className="flex-1">
                  <div className="rounded-xl">
                    <div className="grid grid-cols-2 ">
                      <div className="col  p-1">
                        <PromptFormPreview
                          formInputs={formInputs}
                          onPreviewFormChange={onPreviewFormChange}
                          generateCompletion={generateCompletion}
                        />
                      </div>
                      <div className="col border-l border-0 border-input  p-1 min-h-[30rem]">
                        <PromptOutputSection
                          outputLoadingStatus={isCompletionLoading}
                          output={completion}
                        />
                      </div>
                    </div>
                  </div>

                  {/* {slug == "new" && <PromptLabContainer prompt={defaultPrompt} />} */}
                  {/* {slug !== "new" && prompt?.prompt?.content && (
          <PromptLabContainer prompt={prompt?.prompt?.content} />
          )} */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export function ChatInterface() {
  return (
    <>
      {" "}
      <h2 className="text-xl font-bold">Tab 1 Content</h2>
      <div className="overflow-y-auto h-[calc(100vh-164px)]">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed suscipit
          justo a orci accumsan viverra.
        </p>
        {/* Add more content here */}
      </div>
    </>
  );
}
