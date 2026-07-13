import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { CATEGORIES, TOOLS } from "@/lib/tools/registry";

const featured = TOOLS.filter((t) => t.featured).slice(0, 6);

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
              <Sparkles className="h-4 w-4" />
            </span>
            CreatorBoost <span className="gradient-text">AI</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Everything a creator needs. Powered by AI.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Popular tools</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {featured.map((t) => (
              <li key={t.slug}>
                <Link to="/tools/$slug" params={{ slug: t.slug }} className="hover:text-foreground">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Categories</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {CATEGORIES.slice(0, 8).map((c) => (
              <li key={c}>
                <Link to="/tools" search={{ category: c }} className="hover:text-foreground">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} CreatorBoost AI. All rights reserved.</p>
          <p>Built for the creator economy.</p>
        </div>
      </div>
    </footer>
  );
}
