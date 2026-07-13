import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/tools/registry";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const Icon = tool.icon;
  return (
    <Link
      to="/tools/$slug"
      params={{ slug: tool.slug }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elegant",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
          <Icon className="h-5 w-5" />
        </div>
        {tool.status === "live" ? (
          <Badge variant="secondary" className="border-primary/30 bg-primary/10 text-primary">
            Live
          </Badge>
        ) : (
          <Badge variant="outline" className="text-muted-foreground">Coming soon</Badge>
        )}
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tight">{tool.name}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{tool.tagline}</p>
      <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Open tool <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
}
