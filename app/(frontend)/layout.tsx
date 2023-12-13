import LayoutFooter from "./_footer/LayoutFooter";
import LayoutHeader from "./_header/LayoutHeader";

type SiteLayoutProps = {
  children?: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <LayoutHeader />
      <main className="w-full">{children}</main>
      <LayoutFooter />
    </>
  );
}
