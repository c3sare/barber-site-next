"use client";

import { useNode } from "@craftjs/core";
import { StyledColumnDiv } from "./styled-column-div";

type Props = {
  children?: React.ReactNode;
};

export const Column = ({ children, ...props }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <StyledColumnDiv
      ref={(ref) => {
        connect(ref!);
      }}
      className="min-h-[200px] p-4 w-full"
      {...props}
    >
      {children}
    </StyledColumnDiv>
  );
};

Column.craft = {
  displayName: "Column",
  rules: {
    canDrop: (props: any) => {
      if (props.data.name === "Columns") return true;
      return false;
    },
  },
};
