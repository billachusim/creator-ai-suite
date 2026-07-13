import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  Search,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToolCard } from "@/components/tools/tool-card";
import { TOOLS } from "@/lib/tools/registry";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  component: Home,
});

const featured = TOOLS.filter((t) => t.featured);
const popular = [...TOOLS].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)).slice(0, 8);

const testimonials = [
  {
    name: "Maya R.",
    role: "YouTuber, 240k subs",
    quote:
      "The title generator alone doubled my CTR on my last 3 videos. This is the AI toolkit I wish I had 2 years ago.",
  },
  {
    name: "Devon P.",
    role: "Instagram creator",
    quote:
      "I plan a whole week of captions in 10 minutes. Sounds like me, saves me hours.",
  },
  {
    name: "Priya S.",
    role: "Head of Content, D2C brand",
    quote:
      "Our TikTok hook rate went up 3x after using CreatorBoost for opening lines. Ridiculous ROI.",
  },
];

const faqs = [
  {
    q: "Is CreatorBoost AI free?",
    a: "Yes — every core tool is free to use. We offer Pro plans with unlimited generations, saved history, and premium AI models.",
  },
  {
    q: "Which platforms are supported?",
    a: "YouTube, Instagram, TikTok, LinkedIn, X (Twitter), Facebook, and email newsletters — with more tools shipping every week.",
  },
  {
    q: "Do I need an account?",
    a: "No — you can use the live tools without signing in. Create a free account to save your history, favorite tools, and pick up where you left off.",
  },
  {
    q: "How is this different from ChatGPT?",
    a: "CreatorBoost tools are pre-built for creators: proven prompt frameworks, structured outputs, and per-platform best practices. No prompt engineering required.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "5 flagship tools",
      "20 generations / day",
      "Standard AI models",
      "Save up to 10 outputs",
    ],
    cta: "Start free",
    to: "/auth",
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    highlight: true,
    features: [
      "All 25 tools",
      "Unlimited generations",
      "Premium AI models",
      "Unlimited history + folders",
      "Priority support",
    ],
    cta: "Join Pro waitlist",
    to: "/pricing",
  },
  {
    name: "Team",
    price: "$49",
    period: "/user / mo",
    features: [
      "Everything in Pro",
      "Shared workspace",
      "Brand voice training",
      "Team analytics",
    ],
    cta: "Talk to us",
    to: "/contact",
  },
];

function Home() {
  const [q, setQ] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const searchResults = q.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(q.toLowerCase()) ||
          t.category.toLowerCase().includes(q.toLowerCase()) ||
          t.tagline.toLowerCase().includes(q.toLowerCase()),
      ).slice(0, 6)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-hero absolute inset-0 -z-10" />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              25+ AI tools built for creators
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Everything a creator needs.
              <br />
              <span className="gradient-text">Powered by AI.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
              Create better content, grow faster, optimize your social media, and save hours every week with AI-powered tools built for YouTube, Instagram, TikTok and more.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/auth">
                <Button size="lg" className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90">
                  Start Free <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline">
                  Explore tools
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-xl">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search AI tools — try 'youtube titles', 'hashtags', 'hook'…"
                  className="h-12 rounded-xl pl-10 text-base shadow-card"
                />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-2 overflow-hidden rounded-xl border border-border/60 bg-popover text-left shadow-elegant">
                  {searchResults.map((t) => {
                    const Icon = t.icon;
                    return (
                      <Link
                        key={t.slug}
                        to="/tools/$slug"
                        params={{ slug: t.slug }}
                        className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-accent"
                      >
                        <span className="flex items-center gap-3">
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span>
                            <span className="block text-sm font-medium">{t.name}</span>
                            <span className="block text-xs text-muted-foreground">{t.category}</span>
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Free forever</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> No credit card</span>
              <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-primary" /> Ship in seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Featured</p>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">Popular AI tools for creators</h2>
          </div>
          <Link to="/tools" className="hidden text-sm font-medium text-primary hover:underline md:inline-flex">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/60 bg-surface-muted/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
          {[
            { Icon: Search, title: "Pick a tool", body: "25+ specialized creator tools. No prompt engineering required." },
            { Icon: Zap, title: "Fill in a few fields", body: "Tell us your topic, keywords, and audience. Takes 10 seconds." },
            { Icon: TrendingUp, title: "Ship better content", body: "Copy, edit, and post. Save every output to your dashboard." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border/60 bg-card p-6 shadow-card">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Explore the toolkit</h2>
          <Link to="/tools" className="text-sm font-medium text-primary hover:underline">Browse all 25 →</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border/60 bg-surface-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Loved by creators & brands</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-border/60 bg-card p-6 shadow-card"
              >
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <footer className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="ml-2 text-muted-foreground">{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Simple, creator-first pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you outgrow it.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricing.map((p) => (
            <div
              key={p.name}
              className={
                "relative rounded-2xl border p-6 shadow-card " +
                (p.highlight
                  ? "border-primary/50 bg-card ring-1 ring-primary/30 shadow-elegant"
                  : "border-border/60 bg-card")
              }
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[image:var(--gradient-primary)] px-3 py-1 text-xs font-medium text-primary-foreground shadow-elegant">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.period}</span>
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link to={p.to} className="mt-6 block">
                <Button
                  className={
                    "w-full " +
                    (p.highlight
                      ? "bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90"
                      : "")
                  }
                  variant={p.highlight ? "default" : "outline"}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/60 bg-surface-muted/40">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-6">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-card md:p-12">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">
                <Clock className="h-3.5 w-3.5" /> Weekly, no spam
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
                Get creator growth tips + new tools in your inbox
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                One short email every Friday. AI prompts, hook templates, and what's actually working.
              </p>
            </div>
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!email) return;
                const { error } = await supabase
                  .from("newsletter_subscribers")
                  .insert({ email });
                if (error && !error.message.includes("duplicate")) {
                  toast.error("Couldn't subscribe. Try again.");
                  return;
                }
                setSubscribed(true);
                setEmail("");
                toast.success("You're in. See you Friday.");
              }}
            >
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
              <Button
                type="submit"
                className="h-11 bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
