import { HistoryIcon } from "../../assets/svg/HistoryIcon";

export function PrompLabBottomButtons() {
  return (
    <div className="flex items-center space-x-2">
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
        Submit
      </button>
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
        <span className="sr-only">Show history</span>
        <HistoryIcon />
      </button>
    </div>
  );
}
