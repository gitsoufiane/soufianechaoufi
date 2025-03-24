import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { resumeData } from "./data/resume";

export const metadata = {
  title: "Resume | Soufiane Chaoufi",
  description: "Professional background, education, and technical expertise",
};

export default function ResumePage() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      {/* Contact Information */}
      <section className="mb-12 flex flex-wrap items-center justify-between gap-6">
        <div className="text-muted-foreground flex flex-wrap gap-6">
          <a
            href="mailto:soufiane.chaoufi@gmail.com"
            className="hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span>soufiane.chaoufi@gmail.com</span>
          </a>
          <a
            href="https://github.com/gitsoufiane"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Github className="h-5 w-5" />
            <span>github.com/gitsoufiane</span>
          </a>
          <a
            href="https://linkedin.com/in/soufianechaoufi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <Linkedin className="h-5 w-5" />
            <span>linkedin.com/in/soufianechaoufi</span>
          </a>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open("/resume.pdf", "_blank")}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          <span>Download Resume</span>
        </Button>
      </section>
      {/* Work Experience Section */}
      <section className="mb-12">
        <h1 className="mb-6 text-3xl font-bold">Work Experience</h1>
        <div className="space-y-6">
          {resumeData.workExperience.map((experience, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{experience.title}</CardTitle>
                    <div className="text-muted-foreground">
                      {experience.organization} • {experience.location}
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {experience.period}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {experience.description && (
                  <ul className="mb-4 list-disc space-y-2 pl-4">
                    {experience.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {experience.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">Education</h2>
        <div className="space-y-6">
          {resumeData.education.map((education, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{education.title}</CardTitle>
                    <div className="text-muted-foreground">
                      {education.organization} • {education.location}
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {education.period}
                  </div>
                </div>
              </CardHeader>
              {education.description && (
                <CardContent>
                  <ul className="list-disc space-y-2 pl-4">
                    {education.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold">Skills & Technologies</h2>
        <div className="grid gap-6">
          {resumeData.skills.map((category) => (
            <Card key={category.title}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <Badge
                      key={item.name}
                      variant="secondary"
                      className="flex items-center gap-2 px-3 py-1.5 text-sm"
                    >
                      {item.icon && (
                        <div className="relative h-4 w-4">
                          <img
                            src={item.icon}
                            alt={`${item.name} icon`}
                            className="object-contain"
                            width={16}
                            height={16}
                          />
                        </div>
                      )}
                      <span>{item.name}</span>
                      {item.description && (
                        <span className="text-muted-foreground text-xs">
                          ({item.description})
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section>
        <h2 className="mb-6 text-3xl font-bold">Languages</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              {resumeData.languages.map((language) => (
                <Badge
                  key={language.name}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm"
                >
                  {language.icon && (
                    <div className="relative h-4 w-4">
                      <img
                        src={language.icon}
                        alt={`${language.name} flag`}
                        className="object-contain"
                        width={16}
                        height={16}
                      />
                    </div>
                  )}
                  <span>{language.name}</span>
                  <span className="text-muted-foreground text-xs">
                    ({language.description})
                  </span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
