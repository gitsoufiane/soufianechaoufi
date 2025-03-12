export async function generateMetadata() {
  return {
    title: 'About - Soufiane Chaoufi',
    description: 'Learn more about Soufiane Chaoufi - IT Engineer, full-stack developer, and technology enthusiast',
    keywords: ['about', 'biography', 'skills', 'experience', 'education'],
    openGraph: {
      title: 'About - Soufiane Chaoufi',
      description: 'Learn more about Soufiane Chaoufi - IT Engineer, full-stack developer, and technology enthusiast',
      url: 'https://soufianechaoufi.com/about',
      siteName: 'Soufiane Chaoufi',
      images: [
        {
          url: 'https://soufianechaoufi.com/og-about.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function AboutPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      <div className="prose dark:prose-invert max-w-3xl">
        <p>
          I'm a passionate software engineer with expertise in modern web development.
          I specialize in building scalable, performant applications using cutting-edge
          technologies like Next.js, TypeScript, and Tailwind CSS.
        </p>
        <p>
          With a strong focus on clean code and user experience, I strive to create
          applications that are both functional and beautiful. My experience spans
          full-stack development, from designing APIs to crafting responsive UIs.
        </p>
      </div>
    </div>
  )
}
