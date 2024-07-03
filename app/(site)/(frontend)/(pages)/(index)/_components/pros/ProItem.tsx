import Image from "next/image";

type ProItemProps = {
  icon: string;
  text: string;
};

export const ProItem: React.FC<ProItemProps> = ({ icon, text }) => {
  return (
    <div className="w-full md:w-1/3">
      <Image
        className="float-left m-[6px_20px_6px_0] block align-middle"
        alt="Cutters"
        src={icon}
        width={60}
        height={60}
      />
      {text}
    </div>
  );
};
