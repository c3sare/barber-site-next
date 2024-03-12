import { ParallaxProvider } from "@/providers/ParallaxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
// import { ThemeProvider } from "@/providers/ThemeProvider";
import { RecaptchaV3Provider } from "@/providers/RecaptchaV3Provider";
import { SessionProvider } from "@/providers/SessionProvider";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster />
      <SpeedInsights />
      {/* <ThemeProvider> */}
      <ParallaxProvider>
        <RecaptchaV3Provider>{children}</RecaptchaV3Provider>
      </ParallaxProvider>
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
};
