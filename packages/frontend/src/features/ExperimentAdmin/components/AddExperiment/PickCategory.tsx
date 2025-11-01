import { useState } from "react";

type CategoryProps = {
  categories: {
    id: number;
    name: string;
  }[];
  onSelectCategory: (names: string[]) => () => void;
};
export const PickCategory: React.FC<CategoryProps> = ({
  categories,
  onSelectCategory,
}) => {
  const [selectorState, setSelectorState] = useState(
    categories.map((i) => ({ ...i, selected: false }))
  );

  const selectCategory = (index: number) => () => {
    setSelectorState((prevState) =>
      prevState.map((item, itemIndex) =>
        itemIndex === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const onLocalSelectCategory = () => {
    console.log("calling selected categories");
    const selectedCategories = selectorState
      .filter((i) => i.selected)
      .map((i) => i.name);
    console.log({ selectedCategories });
    onSelectCategory(selectedCategories)();
  };

  return (
    <>
      <div className="flex flex-col space-between h-full">
        <div className="flex-1 flex flex-row overflow-y-hidden w-full">
          <div className="text-card-foreground shadow col-span-3 gap-4 mb-4 w-full">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Select Category
              </h3>
              <p className="text-sm text-muted-foreground">
                Pick category of task for the experiment
              </p>
            </div>
            <div className="my-2 p-6">
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
                        {i.name}
                      </p>
                      <p className="text-sm text-muted-foreground ">Category</p>
                    </div>
                  </div>
                </div>
              ))}
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
              onClick={onLocalSelectCategory}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
