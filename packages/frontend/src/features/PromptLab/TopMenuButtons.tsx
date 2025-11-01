import { PropsWithClassName } from "@/shared/types";
import { twMerge } from "tailwind-merge";
import { MoreIcon } from "../../assets/svg/MoreIcon";

export const TopMenuButtons: React.FC<PropsWithClassName> = ({ className }) => {
  return (
    <div
      className={twMerge(
        "ml-auto flex w-full space-x-2 sm:justify-end",
        className
      )}
    >
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="radix-:r5u:"
        data-state="closed"
      >
        Save Draft
      </button>
      <div className="hidden space-x-2 md:flex">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r61:"
          data-state="closed"
        >
          Publish
        </button>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:r64:"
          data-state="closed"
        >
          Share
        </button>
      </div>
      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2"
        type="button"
        id="radix-:r65:"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
      >
        <span className="sr-only">Actions</span>
        <MoreIcon />
      </button>
    </div>
  );
};
