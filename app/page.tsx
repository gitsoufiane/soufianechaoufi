import Image from "next/image";

import { Button } from "@/components/ui/button"
import Link from "next/link"

export async function generateMetadata() {
  return {
    title: 'Home - Soufiane Chaoufi',
    description: 'Personal website of Soufiane Chaoufi showcasing projects, tools, and activities',
    keywords: ['portfolio', 'developer', 'projects', 'tools', 'activities'],
    openGraph: {
      title: 'Home - Soufiane Chaoufi',
      description: 'Personal website of Soufiane Chaoufi showcasing projects, tools, and activities',
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
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold">Soufiane Chaoufi</h1>
        <h2 className="text-2xl text-muted-foreground">IT Engineer</h2>
        <p className="max-w-2xl text-lg">
          Passionate IT Engineer with expertise in full-stack development, system architecture, and cloud solutions. 
          Dedicated to creating efficient, scalable systems that solve real-world problems.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <Button asChild variant="outline">
          <Link href="/about">About Me</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/projects">Projects</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tools">Tools</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/activities">Activities</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/media">Media</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </main>
  )
}
