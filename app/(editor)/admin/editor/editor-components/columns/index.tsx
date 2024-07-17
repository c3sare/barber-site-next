"use client";

import { useNode } from "@craftjs/core";
import { styled } from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const Div = styled.div<{ $columns: number }>`
  width: ${({ $columns }) => ($columns ? `calc(100% / ${$columns})` : "100%")};

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
      $columns={columns}
      className="min-h-[200px] p-4 w-full"
      {...props}
    >
      {children}
    </Div>
  );
};

Column.craft = {
  displayName: "Column",
  rules: {
    canDrop: (props: any) => {
      if (props.data.name === "Section") return true;
      return false;
    },
  },
};
