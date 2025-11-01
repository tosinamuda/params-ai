import { PropsWithChildren } from "react";

export const TemplateBuilderScreen: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="flex flex-col space-between h-full">{children}</div>;
  };

export const LeftPanel: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className=" border-r border-gray-200 w-full sm:w-8/12 relative flex flex-col justify-center px-5 sm:px-7.5 lg:px-10 xl:px-12.5 ">
        <div className="flex-1 flex flex-col sm:pt-10 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    );
  };

export const RightPanel: React.FC<PropsWithChildren> = ({ children }) => {
    return (
      <div className="w-full sm:w-8/12 relative flex flex-col justify-center px-5 sm:px-7.5 lg:px-10 xl:px-12.5 ">
        <div className="flex-1 flex flex-col sm:pt-10 overflow-y-auto no-scrollbar">
          {children}
        </div>
      </div>
    );
  };

  type PanelHeaderProps = {
    title: React.ReactNode;
    description: React.ReactNode;
  };
export const PanelHeader: React.FC<PropsWithChildren<PanelHeaderProps>> = ({
    children,
  }) => {
    return (
      <div>
        <h2 className="text-dark-light text-base md:text-lg xl:text-xl 2xl:text-[21px] font-semibold pt-5 sm:pt-0 mb-1.5 sm:mb-2.5">
          One Final Step
        </h2>
        <p className="text-[#1f2b34a6] text-[13px] sm:text-xs md:text-[13px] xl:text-sm 2xl:text-[15px] leading-5 sm:leading-4.5 md:leading-5.5 xl:leading-5.5 2xl:leading-5 font-medium  mb-5 md:mb-[30px]">
          Customize the look of your no-code prompt-based app, write your app
          name, choose the prompt category and publish or save as draft.
        </p>
        {children}
      </div>
    );
  };
