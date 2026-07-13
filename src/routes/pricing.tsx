import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  component: Pricing,
  head: () => ({
    meta: [
      { title: "Pricing — CreatorBoost AI" },
      { name: "description", content: "Simple, creator-first pricing. Start free forever. Upgrade to Pro for unlimited AI generations, all tools, and priority support." },
      { property: "og:title", content: "Pricing — CreatorBoost AI" },
      { property: "og:description", content: "Free forever. Pro for $19/mo. Team for $49/user." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 flagship tools", "20 generations / day", "Standard AI models", "Save up to 10 outputs"],
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
    to: "/contact",
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
      "SSO (coming soon)",
    ],
    cta: "Talk to us",
    to: "/contact",
  },
];

function Pricing() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
          Simple, creator-first pricing
        </h1>
        <p className="mt-3 text-muted-foreground">
          Free forever. Upgrade when you outgrow it. Cancel anytime.
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
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
            <h2 className="text-lg font-semibold">{p.name}</h2>
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

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Prefer to pay per report? A pay-per-use option is coming soon.
      </p>
    </section>
  );
}
