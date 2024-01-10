import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import ThemeProvider from "@/providers/theme-provider";

export const metadata: Metadata = {
  title: "Blog NextJs",
  description: `Mon p'tit blog`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <p>Footer</p>
        </ThemeProvider>
      </body>
    </html>
  );
}
