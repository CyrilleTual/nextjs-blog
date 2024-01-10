import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            {/* Pour que le contenu de la page prenne tout le place mais se colle en ht */}
            <div className="flex-grow"> {children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
