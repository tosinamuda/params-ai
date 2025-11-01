import { trpc } from "@/lib/trpc";
import LoadingSkeleton from "@/shared/components/ListSkeleton";
import { useEffect, useState } from "react";
import { match, P } from "ts-pattern";

type PromptProps = {
  category: string;
  onSelectPrompt: (prompts: Array<{id: number; title: string}>) => () => void;
};

type SelectorState<T> = {
  selected: boolean;
} & T;

export const PickPrompt: React.FC<PromptProps> = ({
  category,
  onSelectPrompt,
}) => {
  console.log({ category });
  const selectCategory = (index: number) => () => {
    setSelectorState((prevState) =>
      prevState.map((item, itemIndex) =>
        itemIndex === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const onLocalSelectPrompt = () => {
    console.log("calling selected prompt");
    const selectedPrompt = selectorState
      .filter((i) => i.selected)
      .map(({ id, title }) => ({ id, title }));
    console.log({ selectedPrompt });
    onSelectPrompt(selectedPrompt)();
  };

  const { data: promptLoaded, isPending } =
    trpc.promptCategory.listPrompt.useQuery(category);

  const [selectorState, setSelectorState] = useState<
    Array<SelectorState<{ id: number; title: string }>>
  >([]);

  useEffect(
    function updateSelectorState() {
      if (promptLoaded?.prompts)
        setSelectorState(
          promptLoaded?.prompts.map((i) => ({ ...i, selected: false }))
        );
    },
    [promptLoaded?.prompts]
  );

  console.log({ category, promptLoaded });

  return (
    <div className="flex flex-col space-between h-full">
      <div className="flex-1 flex flex-row overflow-y-hidden w-full">
        <div className="text-card-foreground shadow col-span-3 gap-4 mb-4 w-full">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">
              Select Prompt
            </h3>
            <p className="text-sm text-muted-foreground">
              {`Pick prompt to achieve a task for the experiment under ${category} category`}
            </p>
          </div>
          <div className="my-2 p-6">
            {match({ promptLoaded, isPending })
              .with({ isPending: true }, () => <LoadingSkeleton />)
              .with({ promptLoaded: P.nonNullable }, () => (
                <>
                  {selectorState?.map((i, index) => (
                    <div
                      className="group flex flex-row focus-within:bg-sky-100 focus-within:border focus-within:border-sky-300 border border-gray-200 rounded-md mb-4"
                      key={i.id}
                      tabIndex={0}
                    >
                      <div className="flex items-center grow px-6 py-3">
                        <div className="self-start">
                          <input
                            type="checkbox"
                            checked={i.selected}
                            onChange={selectCategory(index)}
                          />
                        </div>

                        <div className="ml-4 ">
                          <p className="text-base font-medium group-focus-within:font-bold leading-none">
                            {i.title}
                          </p>
                          <p className="text-sm text-muted-foreground ">
                            Prompt
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ))
              .otherwise(() => null)}
          </div>
        </div>
      </div>
      <div className="flex flex-row  px-5 md:px-7.5 lg:px-10 xl:px-12.5 py-3 md:py-3.75 border-t border-light  ">
        <div className="w-full flex flex-row items-center gap-4"></div>
        <div className="flex flex-row items-center justify-between sm:justify-end gap-4 w-full">
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-violet-700 text-white shadow-sm hover:bg-violet-700/70 h-9 px-4 py-2"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r5u:"
            data-state="closed"
            onClick={onLocalSelectPrompt}
            disabled={isPending}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};
