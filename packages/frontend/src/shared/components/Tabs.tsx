import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

type Tab = {
  key: string;
  label: string;
  component: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  headerClass?: string;
  bodyClass?: string;
  className?: string; // New prop for the parent div class
};

function Tab({ tabs, headerClass, bodyClass, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  const openTab = (tabKey: string) => {
    setActiveTab(tabKey);
  };

  return (
    <div className={className}>
      <div className={twMerge("no-scrollbar", headerClass)}>
        <div className="flex space-x-4 px-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => openTab(tab.key)}
              className={twMerge(
                "px-4 py-2",
                activeTab === tab.key &&
                  "border-b-2 border-b-violet-700 hover:border-b-violet-900"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className={bodyClass}>
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={twMerge(
              "h-full",
              activeTab === tab.key ? "block" : "hidden"
            )}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tab;
