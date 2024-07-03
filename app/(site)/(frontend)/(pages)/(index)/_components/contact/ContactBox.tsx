import { cn } from "@/lib/utils";

type ContactBoxProps = {
  children?: React.ReactNode;
  variant?: "normal" | "big";
};

const ContactBox: React.FC<ContactBoxProps> = ({
  children,
  variant = "normal",
}) => {
  const variants = {
    normal: "text-white text-2xl",
    big: "text-[#242424] text-4xl bg-[rgba(255,_255,_255,_.5)]",
  };

  return (
    <div
      className={cn(
        "py-4 uppercase max-w-lg text-center mx-auto",
        variants[variant]
      )}
    >
      {children}
    </div>
  );
};

export default ContactBox;
