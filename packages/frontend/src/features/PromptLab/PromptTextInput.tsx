import { PropsWithClassName } from "@/shared/types";
import { twMerge } from "tailwind-merge";

export const PromptTextInput: React.FC<PropsWithClassName> = ({
  children,
  className,
}) => {
  return (
    <div className={twMerge("p-2 mx-auto font-sans", className)}>
      {children}
    </div>
  );
};
