import { Button as ButtonShadcn } from "@/components/ui/button";

type Props = {
  children?: React.ReactNode;
};

export const Button = ({ children }: Props) => {
  return <Button>{children}</Button>;
};
