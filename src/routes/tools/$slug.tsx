import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToolRunner } from "@/components/tools/tool-runner";
import { WaitlistForm } from "@/components/tools/waitlist-form";
import { getTool, TOOLS } from "@/lib/tools/registry";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ loaderData, params }) => {
    const tool = loaderData?.tool ?? getTool(params.slug);
    if (!tool) {
      return {
        meta: [
          { title: "Tool not found — CreatorBoost AI" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `/tools/${tool.slug}`;
    return {
      meta: [
        { title: tool.seoTitle },
        { name: "description", content: tool.seoDescription },
        { property: "og:title", content: tool.seoTitle },
        { property: "og:description", content: tool.seoDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: tool.seoTitle },
        { name: "twitter:description", content: tool.seoDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: tool.name,
            description: tool.description,
            applicationCategory: "MarketingApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Tools", item: "/tools" },
              { "@type": "ListItem", position: 3, name: tool.name, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ToolPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-3xl font-semibold">Tool not found</h1>
      <Link to="/tools" className="mt-4 inline-block text-primary hover:underline">
        Browse all tools
      </Link>
    </div>
  ),
});

const relatedFor = (slug: string, category: string) =>
  TOOLS.filter((t) => t.slug !== slug && t.category === category).slice(0, 3);

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const Icon = tool.icon;
  const related = relatedFor(tool.slug, tool.category);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="bg-hero absolute inset-0 -z-10 opacity-70" />
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link to="/tools" className="hover:text-foreground">Tools</Link>
            <span>/</span>
            <span className="text-foreground">{tool.name}</span>
          </nav>

          <div className="mt-6 flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
              <Icon className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="text-muted-foreground">{tool.category}</Badge>
                {tool.status === "live" ? (
                  <Badge className="border-primary/30 bg-primary/10 text-primary" variant="secondary">
                    Live
                  </Badge>
                ) : (
                  <Badge variant="outline">Coming soon</Badge>
                )}
              </div>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{tool.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{tool.tagline}</p>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-muted-foreground">{tool.description}</p>
        </div>
      </section>

      {/* Runner / Waitlist */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        {tool.status === "live" && tool.fields ? (
          <ToolRunner tool={tool} />
        ) : (
          <div className="mx-auto max-w-2xl">
            <WaitlistForm toolSlug={tool.slug} toolName={tool.name} />
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Get an email the moment it goes live.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Free early access — no credit card needed.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Try our live tools right now while you wait.</span>
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">More {tool.category} tools</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => {
              const RIcon = t.icon;
              return (
                <Link
                  key={t.slug}
                  to="/tools/$slug"
                  params={{ slug: t.slug }}
                  className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-elegant"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                      <RIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.tagline}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <Link to="/tools" className="mt-8 inline-flex items-center gap-1 text-sm text-primary hover:underline">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to all tools
          </Link>
        </section>
      )}
    </>
  );
}
