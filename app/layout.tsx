import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "photoswipe/dist/photoswipe.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ParallaxProvider } from "@/providers/ParallaxProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
// import { ThemeProvider } from "@/providers/ThemeProvider";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const bebesNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebes-neue",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Barberia",
  description: "Barberia",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            bebesNeue.variable
          )}
        >
          {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <ParallaxProvider>{children}</ParallaxProvider>
          {/* </ThemeProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
