import { EditorHelper, FormHelper } from "@/features/PromptLab/helpers";
import { Compartment } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import { BasicSetupOptions } from "@uiw/react-codemirror";
import Mustache from "mustache";
import React, { useEffect, useState } from "react";

import { usePreviewPromptCompletionMutation } from "@/features/PromptLab/redux/api/prompt";
import { PromptLabProps } from "../models/PromptLab";
import { FormValue } from "../types";

const usePrompt = (p: PromptLabProps) => {
  console.log({ p });
  const [prompt, setPrompt] = useState(p.prompt);

  useEffect(
    function updatePrompt() {
      setPrompt(p.prompt);
    },
    [p.prompt]
  );

  console.log({ prompt });
  const [formInputs, setFormInputs] = useState<FormValue>(
    FormHelper.initFormWithPrompt(prompt)
  );

  const extensions = [
    new Compartment().of(EditorHelper.createPlaceholder().extension),
    new Compartment().of(EditorView.lineWrapping),
  ];

  const basicSetupOptions: BasicSetupOptions = {
    lineNumbers: false,
    foldGutter: false,
    highlightActiveLine: false,
  };

  const onPromptEditorChange = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (value: string, _viewUpdate: ViewUpdate) => {
      setPrompt(value);

      // Extract parameters from prompt editor when prompt changes
      const extractedFormParameters = EditorHelper.parseText(value);
      if (extractedFormParameters) {
        setFormInputs((prevFormInputs) => {
          return FormHelper.syncFormParameter(
            prevFormInputs,
            extractedFormParameters
          );
        });
      }
    },
    []
  );

  // Extract parameters from prompt editor when prompt changes
  /*   useEffect(() => {
    const extractedFormParameters = EditorHelper.parseText(prompt);
    if (extractedFormParameters) {
      setFormInputs((prevFormInputs) => {
        return FormHelper.syncFormParameter(
          prevFormInputs,
          extractedFormParameters
        );
      });
    }
  }, [prompt]);
 */
  // Update inputs element for the preview form generated
  const onPreviewFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevFormInputs) => ({
      ...prevFormInputs,
      [name]: value,
    }));
  };

  const [
    generatePreviewCompletion,
    { isLoading: isCompletionLoading, data: completion },
  ] = usePreviewPromptCompletionMutation();

  // Generate text from the preview form
  const generateCompletion = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const renderedText = Mustache.render(prompt, formInputs);
      console.log(renderedText);
      generatePreviewCompletion({
        prompt: renderedText,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    prompt,
    onPromptEditorChange,
    formInputs,
    onPreviewFormChange,
    extensions,
    basicSetupOptions,
    completion,
    generateCompletion,
    isCompletionLoading,
  };
};

export default usePrompt;
