import { PrompLabBottomButtons } from "@/features/PromptLab/PrompLabBottomButtons";
import PromptLab from "@/features/PromptLab/PromptLab";
import { PromptLabProps } from "@/features/PromptLab/models/PromptLab";

export const PromptLabContainer = (p: PromptLabProps) => {
  return (
    <div className="container h-full py-6">
      <div className="md:order-1">
        <div
          data-state="inactive"
          data-orientation="horizontal"
          role="tabpanel"
          aria-labelledby="radix-:r91:-trigger-complete"
          id="radix-:r91:-content-complete"
          className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-0 border-0 p-0"
        ></div>
        <div className="flex flex-col space-y-4">
          <PromptLab prompt={p.prompt} />
          {/* <PrompLabBottomButtons /> */}
        </div>
      </div>
    </div>
  );
};
