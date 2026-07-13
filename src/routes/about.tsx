import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Zap, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About CreatorBoost AI — Built for Creators" },
      { name: "description", content: "CreatorBoost AI is a modern AI toolkit built for content creators, influencers, marketers, and brands. Ship better content, faster." },
      { property: "og:title", content: "About CreatorBoost AI" },
      { property: "og:description", content: "An AI-first creator toolkit." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

const values = [
  { Icon: Zap, title: "Speed", body: "Every tool is designed for a 10-second workflow. Fill in the fields, hit generate, ship." },
  { Icon: Target, title: "Specialized", body: "Not another generic chatbot. Each tool is tuned with proven frameworks for its specific platform." },
  { Icon: Users, title: "Creator-first", body: "Built by people who ship content daily. Every feature is battle-tested against real growth goals." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-hero absolute inset-0 -z-10" />
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> About us
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
            An AI toolkit built <span className="gradient-text">for creators</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            CreatorBoost AI is a modern creator platform combining 25+ specialized AI tools with a premium, distraction-free experience. Our mission is simple: help creators, influencers, and brands ship better content, faster.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-lg font-semibold tracking-tight">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 md:px-6">
        <div className="rounded-3xl border border-border/60 bg-card p-8 text-center shadow-card md:p-12">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Ready to grow faster?</h2>
          <p className="mt-2 text-muted-foreground">Free to start. No credit card required.</p>
          <Link to="/auth" className="mt-6 inline-block">
            <Button size="lg" className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90">
              Start Free
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
