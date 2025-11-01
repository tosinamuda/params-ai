import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice";
import { defaultPrompt } from "@/features/PromptLab/hooks/constant";
import { useParams } from "react-router-dom";
import { TopMenuButtons } from "../features/PromptLab/TopMenuButtons";
import { PromptLabContainer } from "../features/PromptLab/PromptLabContainer";

function PromptLabPage() {
  const { slug } = useParams();
  const token = useAppSelector(selectCurrentToken);
  const { data: prompt } = trpc.prompt.getBySlug.useQuery(slug!, {
    enabled: Boolean(token && slug && slug !== "new"),
  });
  console.log(prompt);

  return (
    <div className="flex-1">
      <div className="container relative">
        <section>
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            {/* <div className="md:hidden"></div> */}
            <div className="hidden h-full flex-col md:flex">
              <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                <h2 className="text-lg font-semibold">Playground</h2>
                <TopMenuButtons />
              </div>
              <div
                data-orientation="horizontal"
                role="none"
                className="shrink-0 bg-border h-[1px] w-full"
              ></div>
              <div dir="ltr" data-orientation="horizontal" className="flex-1">
                {slug == "new" && <PromptLabContainer prompt={defaultPrompt} />}
                {slug !== "new" && prompt?.prompt?.content && (
                  <PromptLabContainer prompt={prompt?.prompt?.content} />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PromptLabPage;
