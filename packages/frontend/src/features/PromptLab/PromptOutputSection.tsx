type PromptOutputProps = {
  outputLoadingStatus: boolean;
  output?: string;
};
export function PromptOutputSection({
  outputLoadingStatus,
  output,
}: PromptOutputProps) {
  return (
    <>
      {outputLoadingStatus && <span>Loading...</span>}
      {output && !outputLoadingStatus && (
        <textarea
          value={output}
          rows={3}
          readOnly
          className="block w-full h-full resize-none border-0 text-gray-900 sm:text-sm sm:leading-6 bg-muted mx-auto"
          placeholder="AI Output will appear here..."
        />
      )}
    </>
  );
}
