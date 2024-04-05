import { useNode } from "@craftjs/core";

type Props = {
  children?: React.ReactNode;
};

export const Container = ({ children }: Props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        connect(drag(ref!));
      }}
      className="w-full h-screen"
    >
      {children}
    </div>
  );
};
