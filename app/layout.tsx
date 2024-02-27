import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider ";
import { UserProvider } from "@auth0/nextjs-auth0/client";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trivial Trivia V2",
  description:
    "This is Trivia Trivia 2, an uplift from the first edition with numerous bug fixes and UI enchantments!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} dark:bg-black`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
