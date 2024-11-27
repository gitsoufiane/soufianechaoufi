import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SOUFIANE CHAOUFI",
  description: "My space on the internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider attribute="class">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
