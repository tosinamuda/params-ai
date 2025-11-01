import { useAppSelector } from "@/app/redux/hook";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { selectCurrentToken } from "../../Auth/redux/slice/authSlice";

const CategorySchema = z.object({
  name: z.string().min(2),
});
type CategorySchemaType = z.infer<typeof CategorySchema>;

const AddCategory = () => {
  const token = useAppSelector(selectCurrentToken);
  const utils = trpc.useUtils();

  const { data: categories } = trpc.promptCategory.list.useQuery(undefined, {
    enabled: Boolean(token),
  });

  const { mutate: doAddCategory, isPending: isAddCategoryLoading } =
    trpc.promptCategory.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorySchemaType>({ resolver: zodResolver(CategorySchema) });

  //we should here call like API or something...
  const onSubmit: SubmitHandler<CategorySchemaType> = (data) => {
    const { name } = data;
    doAddCategory(
      { name },
      {
        onSuccess: (data) => {
          utils.promptCategory.list.setData(undefined, (oldData) =>
            oldData && data ? [...oldData, data] : oldData
          );
        },
      }
    );
  };

  return (
    <div className="h-full p-8 bg-[#F9FAFC]">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white flex flex-col items-center justify-center px-8 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="flex flex-col px-4 py-4">
            <h2 className="text-lg font-semibold">Add Prompt/Task Category</h2>
            <p className="text-sm text-[#415163]">
              There are a number of possible categories of task achievable by
              LLM such as Generation, Brainstorming, Entity Extraction, Question
              and Answer etc. For most experiment, we only need Generation and
              Brainstorming tasks.
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
                      Category
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 pt-1 pb-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ring-offset-white sm:text-sm sm:leading-6"
                        placeholder={`Enter Category Name`}
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

                <div className="flex flex-row justify-between items-center">
                  <button
                    className="py-2 px-5 rounded bg-indigo-500 text-center text-white hover:text-indigo-800 hover:bg-white hover:outline-violet-400"
                    type="submit"
                    disabled={isAddCategoryLoading}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="px-8 py-4 border border-gray-200 shadow-sm rounded-lg">
          <div className="px-4 py-4  w-full">
            <h2 className="text-lg font-semibold">
              List of Prompt/Task Categories
            </h2>
            {categories && categories.length > 0 && (
              <table className="mt-8 table-auto  w-full border-separate border-spacing-y-2 border border-gray-200 rounded">
                <thead className="text-left">
                  <tr>
                    <th className="text-center">ID</th>
                    <th className="text-center">Category</th>
                    <th className="text-center">Edit</th>
                    <th className="text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((i) => (
                    <tr key={i.name} className="bg-white">
                      <td className=" py-2 text-center">{i.id}</td>
                      <td className=" py-2 text-center">{i.name}</td>
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
    </div>
  );
};
export default AddCategory;
