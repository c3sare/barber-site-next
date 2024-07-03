import LayoutHeader from "./(frontend)/_header/LayoutHeader";
import LayoutFooter from "./(frontend)/_footer/LayoutFooter";
import { RecaptchaV3Provider } from "@/providers/RecaptchaV3Provider";

export default function RootSiteLayout({ children }: React.PropsWithChildren) {
  return (
    <RecaptchaV3Provider>
      <LayoutHeader />
      <main className="w-full">{children}</main>
      <LayoutFooter />
    </RecaptchaV3Provider>
  );
}
