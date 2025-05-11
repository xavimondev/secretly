import "@/app/globals.css";
import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata = {
  title: "Secretly - Secure Credential Management",
  description:
    "Secure credential and secrets management for developers and DevOps teams",
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
      </body>
    </html>
  );
}
