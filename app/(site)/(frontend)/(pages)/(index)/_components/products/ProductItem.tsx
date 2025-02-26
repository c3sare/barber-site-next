import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

type ProductItemProps = {
  id: number;
  image: string;
  name: string;
  promo_cost: string;
  cost: string;
  stars: number;
};

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  name,
  promo_cost,
  cost,
  stars,
}) => {
  return (
    <div className="float-left w-full px-2 md:w-1/2 lg:w-1/4 mb-8">
      <div className="p-1 bg-white shadow-xs w-full flex flex-col items-center justify-between">
        <Image src={image} alt={name} width={243} height={243} />
        <span className="text-lg">{name}</span>
        <div className="flex gap-3 text-xs my-1">
          {!!promo_cost && <span>${promo_cost}</span>}
          <span className={cn(promo_cost && "line-through")}>${cost}</span>
        </div>
        <div className="flex justify-center items-center gap-1 text-[#eabe12]">
          {[...Array(5)].map((_star, i) =>
            i + 1 <= stars ? (
              <StarFilledIcon width={16} height={16} key={i} />
            ) : (
              <StarIcon width={16} height={16} key={i} />
            )
          )}
        </div>
        <Button className="flex items-center justify-center gap-1 relative top-1 translate-y-1/2">
          <SearchIcon className="inline" />
          <span>|</span>
          <span>Quick View</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
