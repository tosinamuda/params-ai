import { CloseIcon } from "../../assets/svg/CloseIcon";

type DialogContainerProps = {
  title: string;
  onCloseDialog: () => void;
};
export const DialogContainer: React.FC<
  React.PropsWithChildren<DialogContainerProps>
> = ({ title, onCloseDialog, children }) => {
  return (
    <div
      className="data-[state=open]:animate-contentShow flex flex-col text-dark fixed top-[50%] left-[50%] w-full max-w-full sm:max-w-[90vw] h-full sm:h-[80vh] lg:max-w-[966px] xl:max-w-[1200px] 2xl:max-w-[1400px] 3xl:max-w-[1400px] translate-x-[-50%] translate-y-[-50%] sm:rounded-xl overflow-y-auto bg-white focus:outline-none z-50"
      style={{ pointerEvents: "auto" }}
    >
      <div className="sm:bg-black flex items-center justify-between p-5 md:py-5.75 xl:py-6.5 md:px-7.5 lg:px-10 xl:px-12.5 border-b border-b-light">
        <div className="text-white text-sm leading-4 font-semibold">
          {title}
        </div>
        <button
          type="button"
          aria-label="Close"
          className="text-white cursor-pointer scale-75"
          onClick={onCloseDialog}
        >
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>
  );
};
