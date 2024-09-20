import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOUFIANE CHAOUFI",
  description: "A Space for my thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
