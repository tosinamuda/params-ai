import CodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { match } from "ts-pattern";
import { PromptFormPreview } from "./PromptFormPreview";
import { PromptTextInput } from "./PromptTextInput";
import usePrompt from "./hooks/usePrompt";
import { twMerge } from "tailwind-merge";

type PromptTemplateViewProps = {
  promptTemplate: string;
  showToggle?: boolean;
  defaultView?: "FORM" | "PROMPT";
  className?: string;
};
export const PromptTemplateView: React.FC<PromptTemplateViewProps> = ({
  promptTemplate,
  showToggle = false,
  defaultView = "PROMPT",
  className
}) => {
  const {
    prompt: template,
    onPromptEditorChange,
    extensions,
    basicSetupOptions,
    formInputs,
    onPreviewFormChange,
    generateCompletion,
  } = usePrompt({ prompt: promptTemplate });

  const [togglePreview, setTogglePreview] = useState(defaultView === "FORM");

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTogglePreview(event.target.checked);
  };

  return (
    <>
      {showToggle && (
        <label className="inline-flex items-center cursor-pointer">
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
            Prompt View
          </span>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={togglePreview}
            onChange={handleCheckboxChange}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Form View
          </span>
        </label>
      )}
      {match({ togglePreview })
        .with({ togglePreview: true }, () => (
          <PromptFormPreview
            className={className}
            formInputs={formInputs}
            onPreviewFormChange={onPreviewFormChange}
            generateCompletion={generateCompletion}
          />
        ))
        .otherwise(() => (
          <PromptTextInput className={twMerge("p-0", className)}>
            <CodeMirror
              autoFocus
              value={template}
              height="100%"
              width="100%"
              basicSetup={basicSetupOptions}
              extensions={extensions}
              onChange={onPromptEditorChange}
            />
          </PromptTextInput>
        ))}
    </>
  );
};
