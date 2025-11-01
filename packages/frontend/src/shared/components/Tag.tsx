import { twMerge } from "tailwind-merge";
import { TagCloseIcon } from "../../assets/svg/TagCloseIcon";

type TagProps = {
  className?: string;
  title: string;
  onClickRemove?: (event: React.MouseEvent<SVGElement>) => void;
  onClick?: (event?: React.MouseEvent<HTMLSpanElement>) => void;
};
export const Tag: React.FC<TagProps> = ({
  title,
  onClickRemove,
  onClick,
  className,
}) => {
  return (
    <span
      className={twMerge(
        "inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-300",
        className
      )}
    >
      {title}
      <button
        type="button"
        className="inline-flex items-center p-1 ms-2 text-sm text-purple-400 bg-transparent rounded-sm hover:bg-purple-200 hover:text-purple-900 dark:hover:bg-purple-800 dark:hover:text-purple-300"
        data-dismiss-target="#badge-dismiss-purple"
        aria-label="Remove"
        onClick={onClick}
      >
        <TagCloseIcon onClick={onClickRemove} className="w-2 h-2" />
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  );
};
