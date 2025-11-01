import CodeMirror from "@uiw/react-codemirror";
import { PromptFormPreview } from "./PromptFormPreview";
import { PromptOutputSection } from "./PromptOutputSection";
import { PromptTextInput } from "./PromptTextInput";
import usePrompt from "./hooks/usePrompt";
import { PromptLabProps } from "./models/PromptLab";

function PromptLab(p: PromptLabProps) {
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
  } = usePrompt(p);

  return (
    <div className="border border-input rounded-xl">
      <div className="grid grid-cols-3 gap-6">
        <div className="col  p-1 min-h-[30rem]">
          <PromptTextInput>
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
        <div className="col border-l border-0 border-input p-1">
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
  );
}

export default PromptLab;
