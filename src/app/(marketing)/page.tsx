// src/app/(marketing)/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Capturing Moments, Telling Stories
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore landscapes, portraits, and wildlife through my lens.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild><a href="/gallery">View Gallery</a></Button>
          <Button variant="outline" asChild><a href="/contact">Contact Me</a></Button>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Featured work {i}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Project Title {i}</h3>
                <p className="text-sm text-muted-foreground">Short description goes here.</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
