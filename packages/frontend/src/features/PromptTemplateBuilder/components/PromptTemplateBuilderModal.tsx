import { DialogContainer } from "@/shared/components/DialogContainer";
import { PromptTemplateBuilder } from "./PromptTemplateBuilder";

type Props = {
  onCloseDialog: () => void;
};

export const PromptTemplateBuilderModal: React.FC<Props> = ({
  onCloseDialog,
}) => {
  return (
    <DialogContainer onCloseDialog={onCloseDialog} title="Prompt Builder">
      <PromptTemplateBuilder className="flex-1 overflow-y-auto no-scrollbar" />
    </DialogContainer>
  );
};
