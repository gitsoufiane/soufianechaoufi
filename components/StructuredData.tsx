import { Thing, WithContext } from 'schema-dts';

interface StructuredDataProps {
  data: WithContext<Thing> | Record<string, any>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Person schema for the website owner
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Soufiane Chaoufi",
  alternateName: "Soufiane",
  description:
    "Frontend developer specializing in React, TypeScript, and modern web applications",
  image: "https://soufianechaoufi.com/profil.png",
  url: "https://soufianechaoufi.com",
  sameAs: [
    "https://github.com/gitsoufiane",
    "https://linkedin.com/in/soufianechaoufi",
  ],
  jobTitle: "Frontend Developer",
  workLocation: {
    "@type": "Place",
    name: "Vancouver, Canada",
  },
  knowsAbout: [
    "React",
    "TypeScript",
    "JavaScript",
    "Next.js",
    "Frontend Development",
    "Web Development",
    "User Interface Design",
  ],
  alumniOf: {
    "@type": "Organization",
    name: "University/College Name",
  },
};

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Soufiane Chaoufi",
  description:
    "Portfolio and blog of Soufiane Chaoufi, Frontend Developer",
  url: "https://soufianechaoufi.com",
  author: {
    "@type": "Person",
    name: "Soufiane Chaoufi",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate:
        "https://soufianechaoufi.com/blog?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Professional service schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Soufiane Chaoufi - Frontend Development Services",
  description:
    "Professional frontend development services including React development, TypeScript consultation, and web application architecture",
  provider: {
    "@type": "Person",
    name: "Soufiane Chaoufi",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Frontend Development",
    "React Development",
    "TypeScript Development",
    "Web Application Development",
    "Code Review",
    "Technical Consultation",
  ],
  url: "https://soufianechaoufi.com",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: "https://soufianechaoufi.com/contact",
  },
};
