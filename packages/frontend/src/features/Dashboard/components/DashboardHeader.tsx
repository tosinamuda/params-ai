import { PropsWithClassName } from "@/shared/types";
import { twMerge } from "tailwind-merge";

const DashboardHeader: React.FC<PropsWithClassName> = ({ className }) => {
  return (
    <nav
      className={twMerge(
        "bg-white text-violet-600 p-4 fixed top-0 w-full z-10 border-b border-b-gray-200 shadow-sm",
        className
      )}
    >
      <div className="container mx-auto">
        <span className="inline-flex justify-center items-center font-bold">
          <img
            src="/images/params-logo.png"
            className="mr-3 h-4 sm:h-6"
            alt="Params AI Logo"
          />
          params.ai
        </span>
      </div>
    </nav>
  );
};

export default DashboardHeader;
