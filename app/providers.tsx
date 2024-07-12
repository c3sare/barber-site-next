import { ParallaxProvider } from "@/providers/ParallaxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
// import { ThemeProvider } from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import StyledComponentsRegistry from "@/lib/registry";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <SessionProvider basePath="/api/auth">
        <Toaster />
        <SpeedInsights />
        {/* <ThemeProvider> */}
        <ParallaxProvider>{children}</ParallaxProvider>
        {/* </ThemeProvider> */}
      </SessionProvider>
    </StyledComponentsRegistry>
  );
};
