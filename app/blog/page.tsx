import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog</h1>
        </div>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground">
              Blog posts will be available soon. Check back later!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
