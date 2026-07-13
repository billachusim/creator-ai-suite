import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { getTool, TOOLS } from "@/lib/tools/registry";
import { toast } from "sonner";
import { ToolCard } from "@/components/tools/tool-card";

type Generation = {
  id: string;
  tool_slug: string;
  input: Record<string, string>;
  output: { text?: string };
  created_at: string;
};

type Favorite = { tool_slug: string };

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Your Dashboard — CreatorBoost AI" },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const [gens, setGens] = useState<Generation[] | null>(null);
  const [favs, setFavs] = useState<Favorite[]>([]);

  async function load() {
    const [g, f] = await Promise.all([
      supabase
        .from("generations")
        .select("id, tool_slug, input, output, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
      supabase.from("favorites").select("tool_slug"),
    ]);
    setGens((g.data as Generation[] | null) ?? []);
    setFavs((f.data as Favorite[] | null) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function del(id: string) {
    const { error } = await supabase.from("generations").delete().eq("id", id);
    if (error) return toast.error("Could not delete");
    setGens((gs) => gs?.filter((g) => g.id !== id) ?? null);
  }

  const favoriteTools = favs
    .map((f) => getTool(f.tool_slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-medium text-primary">Dashboard</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome{user?.email ? `, ${user.email.split("@")[0]}` : ""}
          </h1>
          <p className="mt-2 text-muted-foreground">Your recent AI generations and favorite tools.</p>
        </div>
        <Link to="/tools">
          <Button variant="outline">Browse tools</Button>
        </Link>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold tracking-tight">Recent generations</h2>
          {gens === null ? (
            <div className="grid gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl border border-border/60 bg-card" />
              ))}
            </div>
          ) : gens.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center text-muted-foreground">
              No generations yet. Try a{" "}
              <Link to="/tools" className="text-primary hover:underline">tool</Link>
              {" "}to get started.
            </div>
          ) : (
            gens.map((g) => {
              const tool = getTool(g.tool_slug);
              return (
                <div key={g.id} className="rounded-2xl border border-border/60 bg-card p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Badge variant="outline" className="mb-2">{tool?.category ?? "Tool"}</Badge>
                      <p className="font-semibold">{tool?.name ?? g.tool_slug}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(g.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {tool && (
                        <Link to="/tools/$slug" params={{ slug: tool.slug }}>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> Open
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => del(g.id)} aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {g.output?.text && (
                    <pre className="mt-4 max-h-40 overflow-hidden whitespace-pre-wrap font-sans text-xs text-muted-foreground">
                      {g.output.text.slice(0, 400)}
                      {g.output.text.length > 400 ? "…" : ""}
                    </pre>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Star className="h-4 w-4 text-primary" /> Favorite tools
          </h2>
          {favoriteTools.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              No favorites yet — head to a tool page to add one.
            </p>
          ) : (
            <div className="mt-3 grid gap-3">
              {favoriteTools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          )}

          <h3 className="mt-8 text-sm font-semibold tracking-tight text-muted-foreground">Try next</h3>
          <div className="mt-3 grid gap-3">
            {TOOLS.filter((t) => t.status === "live").slice(0, 2).map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
