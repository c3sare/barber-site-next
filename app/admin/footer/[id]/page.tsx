import { db } from "@/lib/db";

type FooterComponentEditPageProps = {
  params: {
    id: string;
  };
};

export default async function FooterComponentEditPage({
  params: { id },
}: FooterComponentEditPageProps) {
  const component = await db.footerComponent.findUnique({
    where: {
      id,
    },
  });

  return <div></div>;
}
