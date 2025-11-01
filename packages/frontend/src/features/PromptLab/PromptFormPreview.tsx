import { twMerge } from "tailwind-merge";
import StringUtils from "./helpers/StringUtils";
import { FormValue } from "./types";

type PromptFormProps = {
  formInputs: FormValue;
  onPreviewFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateCompletion: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  className?: string
};
export function PromptFormPreview({
  formInputs,
  onPreviewFormChange,
  generateCompletion,
  className
}: PromptFormProps) {
  return (
    <form className={twMerge("min-h-[30rem]", className)}>
      <div className="px-4 py-4 flex flex-col justify-center">
        {Object.keys(formInputs).map((keyword) => (
          <div key={keyword} className="mt-2 mb-4 first:mt-0">
            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-5 font-medium leading-6 text-gray-900"
              >
                {StringUtils.sentenceCase(keyword)}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name={keyword}
                  id={keyword}
                  className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                  placeholder={`Enter ${StringUtils.sentenceCase(keyword)}`}
                  value={formInputs[keyword]}
                  onChange={onPreviewFormChange}
                />
              </div>
            </div>
          </div>
        ))}
        {Object.keys(formInputs).length > 0 && (
          <div className="flex flex-row justify-between items-center">
            <button
              onClick={generateCompletion}
              className="py-2 px-5 rounded bg-indigo-500 text-center text-white hover:text-indigo-800 hover:bg-white hover:outline-violet-400"
            >
              Generate
            </button>
            <span className="text-gray-500 text-xs">
              Powered by{" "}
              <span className="text-violet-700 font-medium">params.ai</span>
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
