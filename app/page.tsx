import Image from "next/image";

import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: 'Soufiane Chaoufi | Senior Frontend Developer',
  description: 'Senior Frontend Developer with 5+ years of experience delivering high-quality, scalable web applications. Proven ability in React, TypeScript, and design systems.',
  keywords: ['portfolio', 'developer', 'projects', 'tools', 'activities'],
  openGraph: {
    title: 'Soufiane Chaoufi | Senior Frontend Developer',
    description: 'Senior Frontend Developer with 5+ years of experience delivering high-quality, scalable web applications. Proven ability in React, TypeScript, and design systems.',
    url: 'https://soufianechaoufi.com',
    siteName: 'Soufiane Chaoufi',
    images: [
      {
        url: 'https://soufianechaoufi.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">Soufiane Chaoufi</h1>
        <h2 className="text-2xl text-muted-foreground">Senior Frontend Developer</h2>
        <p className="max-w-2xl text-lg">
          Senior Frontend Developer with 5+ years of experience delivering high-quality, scalable web applications. 
          Proven ability in React, TypeScript, and design systems. Skilled collaborator, passionate about creating 
          efficient user-centric solutions that drive engagement and improve performance.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button asChild variant="outline">
          <Link href="/projects">Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tech-stack">Tech Stack</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/books">Books</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/activities">Activities</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </main>
  )
}
