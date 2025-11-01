import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import {
  metaPromptKey,
  promptTemplateMetaPrompt,
} from "@/features/PromptLab/hooks/constant";

import React, { useState } from "react";

import { match } from "ts-pattern";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../Auth/redux/slice/authSlice";
import { preparePrompt } from "../../PromptLab/utils";
import { PromptDetailFormStep } from "./PromptDetailFormStep";
import { PromptGeneralizationStep } from "./PromptGeneralizationStep";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const PromptTemplateBuilder: React.FC<Props> = ({ className }) => {
  const token = useAppSelector(selectCurrentToken);

  const userObj = useAppSelector(selectCurrentUser);
  const { data: user } = trpc.user.getByEmail.useQuery(
    { email: userObj?.email },
    {
      enabled: Boolean(!!token && !!userObj?.email),
    }
  );

  const [step, setStep] = useState(0);

  const {
    data: promptTemplate,
    isPending: isPromptTemplatePending,
    isSuccess: isPromptTemplateSuccess,
    mutate: doLLMInferencing,
  } = trpc.inference.completion.useMutation();

  const onGenerate = (prompt: string) => () => {
    const input = preparePrompt({
      template: promptTemplateMetaPrompt,
      keyword: metaPromptKey,
      replacement: prompt,
    });
    doLLMInferencing({ prompt: input });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className={className}>
      {match({ step })
        .with({ step: 0 }, () => (
          <PromptGeneralizationStep
            isPromptTemplatePending={isPromptTemplatePending}
            isPromptTemplateSuccess={isPromptTemplateSuccess}
            onGenerate={onGenerate}
            nextStep={nextStep}
            prevStep={prevStep}
            promptTemplate={promptTemplate}
            step={step}
          />
        ))
        .with({ step: 1 }, () => (
          <PromptDetailFormStep
            promptTemplate={promptTemplate}
            step={step}
            nextStep={nextStep}
            prevStep={prevStep}
            user={user}
            token={token}
          />
        ))
        .otherwise(() => (
          <></>
        ))}
    </div>
  );
};
