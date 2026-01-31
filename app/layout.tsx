import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  StructuredData,
  personSchema,
  websiteSchema,
  professionalServiceSchema,
} from "@/components/StructuredData";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Soufiane Chaoufi | Frontend Developer",
    template: "%s | Soufiane Chaoufi",
  },
  description:
    "Frontend developer building fast, accessible web applications with React, TypeScript, and modern technologies. Available for collaboration and consulting.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Web Development",
    "UI/UX",
    "Remote Developer",
    "Vancouver",
    "Canada",
  ],
  authors: [{ name: "Soufiane Chaoufi" }],
  creator: "Soufiane Chaoufi",
  publisher: "Soufiane Chaoufi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://soufianechaoufi.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://soufianechaoufi.com",
    siteName: "Soufiane Chaoufi",
    title: "Soufiane Chaoufi | Frontend Developer",
    description:
      "Frontend developer building fast, accessible web applications with React, TypeScript, and modern technologies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Soufiane Chaoufi - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Soufiane Chaoufi | Frontend Developer",
    description:
      "Frontend developer building fast, accessible web applications with React, TypeScript, and modern technologies.",
    images: ["/og-image.jpg"],
    creator: "@soufianechaoufi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData data={personSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={professionalServiceSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Skip Navigation Links for Accessibility */}
        <a
          href="#main-content"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-32 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Skip to navigation
        </a>

        <ThemeProvider>
          <ErrorBoundary>
            <Navbar />
            <main id="main-content" className="min-h-screen">
              <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
            <Footer />
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
