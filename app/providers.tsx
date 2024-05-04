import { ParallaxProvider } from "@/providers/ParallaxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
// import { ThemeProvider } from "@/providers/ThemeProvider";
import { RecaptchaV3Provider } from "@/providers/RecaptchaV3Provider";
import { SessionProvider } from "next-auth/react";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider basePath="/api/auth">
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
