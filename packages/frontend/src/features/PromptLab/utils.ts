export const extractPromptTemplate = (
  input:
    | string
    | null
    | {
        readonly locked: boolean;
      }
    | undefined
): string | null => {
  if (input && typeof input === "string") {
    const regex = /<PromptTemplate>(.*?)<\/PromptTemplate>/s;
    const match = input.match(regex);
    return match ? match[1].trim() : null;
  } else return null;
};
// Perform the replacement
export const preparePrompt = ({
  template,
  keyword,
  replacement,
}: {
  template: string;
  keyword: string;
  replacement: string;
}) => template.replace(keyword, replacement);
