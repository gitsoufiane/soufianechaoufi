import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, FileQuestion, Search, BookOpen, Code } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card className="shadow-2xl border-border/40 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <FileQuestion className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <Badge variant="destructive" className="text-xs font-medium">
                Error 404
              </Badge>
              <CardTitle className="text-3xl sm:text-4xl font-bold tracking-tight">
                Page Not Found
              </CardTitle>
              <CardDescription className="text-base sm:text-lg max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved to a different location.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Button asChild size="lg" className="h-12">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12">
                <Link href="/blog">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Articles
                </Link>
              </Button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 text-center">
                You might also be interested in:
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="ghost" className="h-auto p-4 justify-start">
                  <Link href="/blog" className="flex flex-col items-start space-y-1">
                    <div className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      <span className="font-medium">Articles</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Read my blog posts
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="h-auto p-4 justify-start">
                  <Link href="/projects" className="flex flex-col items-start space-y-1">
                    <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      <span className="font-medium">Projects</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      View my work
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
