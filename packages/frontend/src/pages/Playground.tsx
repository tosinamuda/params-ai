import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import { selectCurrentToken } from "@/features/Auth/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { TopMenuButtons } from "../features/PromptLab/TopMenuButtons";

type PromptProps = {
  title: string;
  description: string | null;
  slug: string;
};

function Prompt(p: PromptProps) {
  console.log(p);
  const navigate = useNavigate();
  const onClickView = () => navigate(`/studio/${p.slug}`);
  return (
    <div className="flex flex-col w-[600px]  bg-white rounded-lg justify-center">
      <div className="grid grid-cols-10 p-8">
        <div className="col-span-6 flex flex-col justify-center">
          <div className="font-bold text-lg">{p.title}</div>
          <div className="pt-4">
            {p.description ??
              "I am excited to read your work and give you feedback"}
          </div>
        </div>
        <div className="col-span-4 ">
          <div className="flex flex-col justify-center w-full h-full">
            <img className="w-full h-auto" src="/images/prompt-icon.png" />
          </div>
        </div>
      </div>
      <div className="flex justify-end px-8 pt-2 pb-4">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-700 text-white shadow-sm hover:bg-blue-700/70 px-6 py-2"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r61:"
          data-state="closed"
          onClick={onClickView}
        >
          View
        </button>
      </div>
    </div>
  );
}

const StudioHome = () => {
  return (
    <>
      <FeaturedPrompts />
      <MyPrompts />
    </>
  );
};

const FeaturedPrompts = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: prompts } = trpc.prompt.list.useQuery(undefined, {
    enabled: Boolean(token),
  });
  console.log(prompts);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>Featured Prompts</div>
        <div>
          <button className="text-sm px-2.5 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-700 hover:text-white">
            Add New
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        {prompts?.prompt.map((p) => (
          <Prompt
            key={p.id}
            title={p.title}
            description={p.description}
            slug={p.slug}
          />
        ))}
      </div>
    </>
  );
};

const MyPrompts = () => {
  const token = useAppSelector(selectCurrentToken);
  const { data: prompts } = trpc.prompt.list.useQuery(undefined, {
    enabled: Boolean(token),
  });
  console.log(prompts);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>My Prompts</div>
        <div>
          <button className="text-sm px-2.5 py-1.5 border border-blue-600 text-blue-600 bg-white hover:bg-blue-700 hover:text-white">
            Add New
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        {prompts?.prompt.map((p) => (
          <Prompt
            key={p.id}
            title={p.title}
            description={p.description}
            slug={p.slug}
          />
        ))}
      </div>
    </>
  );
};

function Playground() {
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
                <StudioContainer />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Playground;

const StudioContainer = () => {
  return (
    <div className="container h-full py-6 bg-slate-100">
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
          <StudioHome />
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* const PromptLabContainer = () => {
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
          <PromptLab />
          <PrompLabBottomButtons />
        </div>
      </div>
    </div>
  );
}; */
