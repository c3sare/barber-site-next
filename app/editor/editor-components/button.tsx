import { Button as ButtonShadcn } from "@/components/ui/button";
import { useNode } from "@craftjs/core";

type Props = {
  text: string;
};

export const Button = ({ text }: Props) => {
  const {
    connectors: { drag },
  } = useNode<HTMLButtonElement>();

  return (
    <ButtonShadcn
      ref={(ref) => {
        drag(ref!);
      }}
    >
      {text}
    </ButtonShadcn>
  );
};
