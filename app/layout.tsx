import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "photoswipe/dist/photoswipe.css";
import "./globals.css";
import { cn } from "@/lib/utils";
import LayoutHeader from "./(frontend)/_header/LayoutHeader";
import LayoutFooter from "./(frontend)/_footer/LayoutFooter";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/react";

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          bebesNeue.variable
        )}
      >
        <Providers>
          <LayoutHeader />
          <main className="w-full">{children}</main>
          <LayoutFooter />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
