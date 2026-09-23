import { cn } from "@/lib/utils/styles";

import "./global.css";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixelify",
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={cn(geist.className, geistMono.variable, pixelify.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
