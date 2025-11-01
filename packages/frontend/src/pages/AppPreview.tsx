import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice";
import { useParams } from "react-router-dom";
import { Footer } from "../layouts/Footer";

import { FormHelper, StringUtils } from "@/features/PromptLab/helpers";

import Mustache from "mustache";
import { useState } from "react";

import { FormValue } from "@/features/PromptLab/types";

const AppPreview = () => {
  const { slug } = useParams();
  const token = useAppSelector(selectCurrentToken);
  const { data: promptData } = trpc.prompt.getBySlug.useQuery(slug!, {
    enabled: Boolean(token && slug),
  });
  console.log(promptData);

  return (
    <>
      <header className="container">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <div className="flex flex-wrap items-center">
              {" "}
              <a href="/" className="flex items-center">
                <img
                  src="/images/params-logo.png"
                  className="mr-3 h-6 sm:h-9"
                  alt="Params AI Logo"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  {promptData?.prompt?.title}
                </span>
              </a>
              <span className="self-center bg-purple-300/30 text-purple-600/60 rounded-full ml-2 py-0.5 px-2 text-sm">
                Research Preview
              </span>
            </div>

            <div className="flex items-center lg:order-2">
              <a
                href="#"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Try Studio
              </a>
            </div>
          </div>
        </nav>
      </header>

      {promptData?.prompt?.content && (
        <AppContainer content={promptData?.prompt?.content} />
      )}

      <Footer></Footer>
    </>
  );
};

export default AppPreview;

type AppContainerProps = {
  content: string;
};
function AppContainer(p: AppContainerProps) {
  console.log(p.content);
  const [prompt] = useState(p.content);
  const [formInputs, setFormInputs] = useState<FormValue>(
    FormHelper.initFormWithPrompt(prompt)
  );

  // Update inputs element for the preview form generated
  const onPreviewFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevFormInputs) => ({
      ...prevFormInputs,
      [name]: value,
    }));
  };

  /*   const [
    generatePreviewCompletion,
    { isLoading: isCompletionLoading, data: completion },
  ] = usePreviewPromptCompletionMutation();
 */
  const {
    data: completion,
    isPending: isCompletionLoading,
    mutate: doLLMInferencing,
  } = trpc.inference.completion.useMutation();

  // Generate text from the preview form
  const generateCompletion = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const renderedText = Mustache.render(prompt, formInputs);
      console.log(renderedText);
      doLLMInferencing({ prompt: renderedText });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="container bg-white dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full py-8  lg:py-16  px-4 lg:px-6 ">
        <div className="grid grid-cols-2 gap-6 w-full">
          <div className="col  p-1">
            <form className="min-h-[30rem]">
              {Object.keys(formInputs).map((keyword) => (
                <div key={keyword} className="max-w-xs w-full  mt-2 mb-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                    >
                      {StringUtils.sentenceCase(keyword)}
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name={keyword}
                        id={keyword}
                        className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                        placeholder={`Enter ${StringUtils.sentenceCase(
                          keyword
                        )}`}
                        value={formInputs[keyword]}
                        onChange={onPreviewFormChange}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {Object.keys(formInputs).length > 0 && (
                <div className="max-w-xs w-full mt-2 mb-4">
                  <button
                    onClick={generateCompletion}
                    className="mx-auto form-input rounded bg-indigo-500 text-center text-white hover:text-indigo-800 hover:bg-white hover:outline-violet-400"
                  >
                    Generate
                  </button>
                </div>
              )}
            </form>
          </div>
          <div className="col border p-1 min-h-[30rem]">
            {isCompletionLoading && <span>Loading...</span>}
            {completion && !isCompletionLoading && (
              <textarea
                value={completion as string}
                rows={3}
                readOnly
                className="block w-full h-full resize-none border-0 text-gray-900 sm:text-sm sm:leading-6 bg-muted mx-auto"
                placeholder="AI Output will appear here..."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
