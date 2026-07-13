import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/tools/tool-card";
import { CATEGORIES, TOOLS, type ToolCategory } from "@/lib/tools/registry";

const searchSchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/tools/")({
  validateSearch: searchSchema,
  component: ToolsIndex,
  head: () => ({
    meta: [
      { title: "All AI Tools for Creators — CreatorBoost AI" },
      {
        name: "description",
        content:
          "Browse 25+ free AI tools for creators: YouTube titles & scripts, Instagram captions & bios, TikTok hooks, LinkedIn posts, hashtags, ad copy, and more.",
      },
      { property: "og:title", content: "All AI Tools for Creators — CreatorBoost AI" },
      { property: "og:description", content: "25+ AI tools for creators. Free to use." },
      { property: "og:url", content: "/tools" },
    ],
    links: [{ rel: "canonical", href: "/tools" }],
  }),
});

function ToolsIndex() {
  const { category } = Route.useSearch();
  const [q, setQ] = useState("");
  const active = (category as ToolCategory | undefined) ?? undefined;

  const filtered = TOOLS.filter((t) => {
    if (active && t.category !== active) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!t.name.toLowerCase().includes(s) && !t.tagline.toLowerCase().includes(s) && !t.category.toLowerCase().includes(s)) {
        return false;
      }
    }
    return true;
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-primary">AI Creator Toolkit</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Every AI tool a creator needs
        </h1>
        <p className="mt-3 text-muted-foreground">
          25+ specialized tools for YouTube, Instagram, TikTok, LinkedIn, X, and more. Free to use — sign in to save your history.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="h-11 pl-9"
            placeholder="Search 25+ tools…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Link to="/tools" search={{}}>
            <Button variant={active ? "outline" : "default"} size="sm" className={!active ? "bg-[image:var(--gradient-primary)] text-primary-foreground" : ""}>
              All
            </Button>
          </Link>
          {CATEGORIES.map((c) => (
            <Link key={c} to="/tools" search={{ category: c }}>
              <Button
                variant={active === c ? "default" : "outline"}
                size="sm"
                className={active === c ? "bg-[image:var(--gradient-primary)] text-primary-foreground" : ""}
              >
                {c}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No tools match that filter.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      )}
    </section>
  );
}
