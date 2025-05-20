import "@/app/globals.css";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next/types";
import { APP_URL } from "./constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const title = "Secretly - Secure Credential Management";
const description =
  "Secure credential and secrets management for developers and DevOps teams";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "secretly",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`dark ${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground`}
      >
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <main>{children}</main>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
