import Link from "next/link";

type LinkListItemProps = {
  id: number;
  href: string;
  name: string;
};

const LinkListItem: React.FC<LinkListItemProps> = ({ href, name }) => {
  return (
    <li className="before:content-['>'] before:font-bold flex gap-1 text-sm">
      <Link
        href={href}
        className="hover:text-primary transition-colors duration-500"
      >
        {name}
      </Link>
    </li>
  );
};

export default LinkListItem;
