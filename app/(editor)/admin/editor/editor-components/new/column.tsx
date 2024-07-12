"use client";

import { useNode } from "@craftjs/core";
import { styled } from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const Div = styled.div<{ $columns: number }>`
  width: calc(100% / ${(props) => props.$columns});

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Column = ({ children, ...props }: Props) => {
  const {
    columns,
    connectors: { connect },
  } = useNode((node) => ({
    columns: node.dom?.parentNode?.children.length || 0,
  }));
  return (
    <Div
      ref={(ref) => {
        connect(ref!);
      }}
      className="min-h-[200px] p-4"
      $columns={columns}
      {...props}
    >
      {children}
    </Div>
  );
};

Column.craft = {
  displayName: "Column",
  rules: {
    canDrop: () => true,
  },
};
