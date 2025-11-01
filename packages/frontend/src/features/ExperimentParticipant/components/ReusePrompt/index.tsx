import { useAppSelector } from "@/app/redux/hook";
import { trpc } from "@/lib/trpc";
import { DialogContainer } from "@/shared/components/DialogContainer";
import { useDialog } from "@/shared/hooks/useDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { match } from "ts-pattern";
import { z } from "zod";
import { Tag } from "../../../../shared/components/Tag";
import { selectCurrentToken } from "../../../Auth/redux/slice/authSlice";
import { PickCategory } from "./PickCategory";
import { PickInterface } from "./PickInterface";
import { PickPrompt } from "./PickPrompt";

const ExperimentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  prompts: z.array(z.number()),
  interfaces: z.array(z.string()),
  categoryPromptMap: z.record(
    z.array(
      z.object({
        id: z.number(),
        title: z.string(),
      })
    )
  ),
});
type ExperimentSchemaType = z.infer<typeof ExperimentSchema>;

type PromptPayload = { type: "prompt"; data: { category: string } };

type DialogPayload =
  | { type: "category"; data?: unknown }
  | { type: "interface"; data?: unknown }
  | PromptPayload
  | null;

const AddExperiment = () => {
  const token = useAppSelector(selectCurrentToken);
  const utils = trpc.useUtils();

  const { data: interfaces } = trpc.interface.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { data: categories } = trpc.promptCategory.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { data: experiments } = trpc.experiment.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { mutate: doAddExperiment, isPending: isAddExperimentLoading } =
    trpc.experiment.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useForm<ExperimentSchemaType>({
    resolver: zodResolver(ExperimentSchema),
  });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<ExperimentSchemaType> = (data) => {
    console.log({ message: "onsubmit called ", data });
    doAddExperiment(data, {
      onSuccess: () => {
        utils.experiment.list.invalidate();
      },
    });
  };

  const { openDialog, dialogRef, closeDialog } = useDialog();

  const [dialogPayload, setDialogPayload] = useState<DialogPayload | null>(
    null
  );
  const showDialog = (payload: DialogPayload) => () => {
    setDialogPayload(payload);
    openDialog();
  };
  const { type: dialogType, data: dialogData } = dialogPayload ?? {};

  const onSelectInterface = (names: string[]) => () => {
    console.log("calling onselect interface");
    closeDialog();
    const interfaces = getValues("interfaces");
    console.log({ interfaces });
    setValue("interfaces", names);
    console.log({ interface: getValues("interfaces") });
  };

  const onSelectCategory = (names: string[]) => () => {
    console.log("calling onselect interface");
    closeDialog();

    const categories = getValues("categoryPromptMap");
    console.log({ categories });

    const newCategoryMap: Record<string, string[]> = names.reduce(
      (acc, curr) => {
        if (!acc[curr]) {
          acc[curr] = [];
        } else {
          acc[curr] = categories[curr] || [];
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    setValue("categoryPromptMap", newCategoryMap);
    console.log({ categories: getValues("categoryPromptMap") });
  };

  const onSelectPrompt =
    (prompts: Array<{ id: number; title: string }>) => () => {
      console.log("calling onselect interface");
      closeDialog();

      if (dialogType === "prompt" && dialogData?.category) {
        const selectedCategory = dialogData.category;
        const categories = getValues("categoryPromptMap");
        console.log({ categories });

        const updatedCategoryMap = {
          ...categories,
          [selectedCategory]: prompts,
        };
        setValue("categoryPromptMap", updatedCategoryMap);
        console.log({ categories: getValues("categoryPromptMap") });

        updateUniquePrompts(prompts);
      }
    };

  const updateUniquePrompts = (
    prompts: Array<{ id: number; title: string }>
  ) => {
    const currentPromptsId = getValues("prompts"); // Step 1: Get current prompt IDs
    const promptIds = prompts.map((p) => p.id); // Step 2: Get new prompt IDs

    // Step 3: Create a Set with the current prompt IDs
    const promptSet = new Set(currentPromptsId);

    // Step 4: Add new prompt IDs to the Set
    promptIds.forEach((id) => promptSet.add(id));

    // Step 5: Convert the Set back to an array and return it
    const combinedPromptIds = Array.from(promptSet);

    setValue("prompts", combinedPromptIds);
  };

  return (
    <div className="h-full p-8 bg-[#F9FAFC]">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white flex flex-col items-center justify-center px-8 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="flex flex-col px-4 py-4">
            <h2 className="text-lg font-semibold">Add Experiment</h2>
            <p className="text-sm text-[#415163]">
              Experiment is a collection of prompt categories which prompt to be
              tested on specified interface types.
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="min-h-[20rem] mt-8"
            >
              <div className="flex flex-col justify-center">
                <div className="mt-2 mb-4 first:mt-0">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                        placeholder={`Enter Experiment Name`}
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-sm text-red-400">
                          {errors.name.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-4 first:mt-0">
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                        placeholder={`Add a description for your experiment`}
                        {...register("description")}
                      />
                      {errors.description && (
                        <span className="text-sm text-red-400">
                          {errors.description.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 mb-4 first:mt-0">
                  <div>
                    <label
                      htmlFor="interfaces"
                      className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                    >
                      Add Interface
                    </label>
                    <div className="mt-1">
                      <div className="rounded-md w-full bg-gray-50 border border-gray-300 shadow-sm flex flex-col justify-center">
                        <div className="flex p-4 items-center">
                          <button
                            type="button"
                            className="bg-white text-primary border border-primary rounded-md px-1 py-2 text-sm  hover:bg-primary/80 hover:text-white inline-flex justify-center items-center"
                            onClick={showDialog({ type: "interface" })}
                          >
                            Select Interface
                          </button>
                        </div>
                        <div className="border-b border-b-gray-200 h-1"></div>
                        <div className="flex p-4 items-center">
                          <Controller
                            name="interfaces"
                            control={control}
                            render={({ field }) => (
                              <>
                                {field.value?.map((f) => (
                                  <Tag
                                    key={f}
                                    title={f}
                                    className="mr-1 last:mr-0"
                                  />
                                ))}
                              </>
                            )}
                          />
                        </div>
                      </div>
                      {errors.interfaces && (
                        <span className="text-sm text-red-400">
                          {errors.interfaces.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-2 mb-4 first:mt-0">
                  <div>
                    <label
                      htmlFor="categoryPromptMap"
                      className="block text-sm leading-5 font-medium leading-6 text-gray-900"
                    >
                      Add Category and Prompt
                    </label>
                    <div className="mt-1">
                      <div className="rounded-md w-full border border-gray-300 shadow-sm flex flex-col justify-center">
                        <div className="flex p-4 items-center">
                          <button
                            type="button"
                            className="bg-white text-primary border border-primary rounded-md px-1 py-2 text-sm  hover:bg-primary/80 hover:text-white inline-flex justify-center items-center"
                            onClick={showDialog({ type: "category" })}
                          >
                            Select Category
                          </button>
                        </div>
                        <div className="border-b border-b-gray-200 h-1"></div>
                        <div className="flex flex-col p-4 space-y-8">
                          <Controller
                            name="categoryPromptMap"
                            control={control}
                            render={({ field }) => (
                              <>
                                {field.value &&
                                  Object.keys(field.value).map((category) => (
                                    <div key={category}>
                                      <span className="text-secondary-foreground text-sm">
                                        {category}
                                      </span>
                                      <div className="flex flex-col border border-gray-100 rounded-md">
                                        <div className="px-4 py-2">
                                          <button
                                            type="button"
                                            className="bg-white text-primary border border-primary rounded-md px-1 py-1 text-xs  hover:bg-primary/80 hover:text-white inline-flex justify-center items-center"
                                            onClick={showDialog({
                                              type: "prompt",
                                              data: { category },
                                            })}
                                          >
                                            Add Prompt
                                          </button>
                                        </div>

                                        <div className="border-b border-b-gray-200 h-1"></div>

                                        <div className="text-sm px-4 py-2">
                                          {field.value[category].map(
                                            (prompt) => (
                                              <Tag
                                                key={prompt.id}
                                                title={prompt.title}
                                                className="mr-1 mb-1 last:mb-0 last:mr-0"
                                              />
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                              </>
                            )}
                          />
                        </div>
                      </div>
                      {errors.categoryPromptMap && (
                        <span className="text-sm text-red-400">
                          {errors.categoryPromptMap.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center">
                  <button
                    className="py-2 px-5 rounded bg-primary text-center text-white hover:text-indigo-800 hover:border hover:border-primary hover:bg-white hover:outline-violet-400 disabled:bg-gray-100 disabled:hover:bg-gray-100 disabled:text-slate-700"
                    type="submit"
                    disabled={isAddExperimentLoading}
                  >
                    Add Experiment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="px-8 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="px-4 py-4  w-full">
            <h2 className="text-lg font-semibold">List of Experiment Types</h2>
            {experiments && experiments.length > 0 && (
              <table className="mt-8 table-auto  w-full border-separate border-spacing-y-2 border border-gray-200 rounded">
                <thead className="text-left">
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Type</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {experiments.map(({ id, name }) => (
                    <tr key={name} className="bg-white">
                      <td className=" py-2 text-center">{id}</td>
                      <td className=" py-2 text-center">{name}</td>
                      <td className=" py-2 text-center">
                        <span className="underline text-violet-600">Edit</span>
                      </td>
                      <td className="py-2 text-center">
                        <span className="underline text-violet-600">
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <dialog ref={dialogRef} className="dialog">
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8">
            <DialogContainer
              onCloseDialog={closeDialog}
              title={`Pick ${dialogPayload?.type}`}
            >
              {match({ dialogType, dialogData })
                .with({ dialogType: "interface" }, () => (
                  <>
                    {interfaces && (
                      <PickInterface
                        interfaces={interfaces}
                        onSelectInterface={onSelectInterface}
                      />
                    )}
                  </>
                ))
                .with({ dialogType: "category" }, () => (
                  <>
                    {categories && (
                      <PickCategory
                        categories={categories}
                        onSelectCategory={onSelectCategory}
                      />
                    )}
                  </>
                ))
                .with({ dialogType: "prompt" }, () => (
                  <>
                    {dialogData && (
                      <PickPrompt
                        category={
                          (dialogPayload as PromptPayload).data.category
                        }
                        onSelectPrompt={onSelectPrompt}
                      />
                    )}
                  </>
                ))
                .otherwise(() => null)}
            </DialogContainer>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddExperiment;
