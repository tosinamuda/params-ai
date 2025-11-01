import React from "react";

type AdditionalProps =
  {
    className?: string;
  }

export type PropsWithClassName = React.PropsWithChildren<AdditionalProps>;
