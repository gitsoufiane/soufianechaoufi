import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
