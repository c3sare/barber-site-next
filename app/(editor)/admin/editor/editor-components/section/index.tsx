"use client";

import { useNode } from "@craftjs/core";
import { StyledSection } from "./styled-section";

type Props = {
  children?: React.ReactNode;
};

export const Section = ({ children, ...props }: Props) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <StyledSection
      className="w-full"
      ref={(ref) => {
        connect(ref!);
      }}
      {...props}
    >
      <div className="container min-h-[400px] flex justify-between gap-4 flex-col items-center">
        {children}
      </div>
    </StyledSection>
  );
};

Section.craft = {
  displayName: "Section",
  rules: {
    canDrop: () => true,
  },
};
