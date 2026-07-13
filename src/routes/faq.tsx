import { createFileRoute } from "@tanstack/react-router";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Is CreatorBoost AI free?", a: "Yes — every core tool is free to use. Pro plans unlock unlimited generations, all 25 tools, premium AI models, and unlimited history." },
  { q: "Do I need an account?", a: "No — you can use the live tools without signing in. Create a free account to save your history, favorite tools, and pick up where you left off." },
  { q: "Which platforms are supported?", a: "YouTube, Instagram, TikTok, LinkedIn, X (Twitter), Facebook, and email newsletters — with more tools shipping every week." },
  { q: "How is CreatorBoost different from ChatGPT?", a: "Every tool ships with a pre-built prompt framework, structured outputs, and per-platform best practices. You get creator-grade results without any prompt engineering." },
  { q: "What AI models power CreatorBoost?", a: "We use best-in-class large language models through the Lovable AI Gateway. Free users get standard models; Pro users get premium models with faster response times." },
  { q: "Can I use CreatorBoost for my clients?", a: "Yes — our Pro and Team plans allow commercial use for agencies and consultants." },
  { q: "Do you offer a refund?", a: "We offer a 14-day money-back guarantee on all paid plans, no questions asked." },
];

export const Route = createFileRoute("/faq")({
  component: FAQ,
  head: () => ({
    meta: [
      { title: "FAQ — CreatorBoost AI" },
      { name: "description", content: "Answers to common questions about CreatorBoost AI: pricing, tools, AI models, refunds, and more." },
      { property: "og:title", content: "FAQ — CreatorBoost AI" },
      { property: "og:description", content: "Pricing, tools, AI models — everything you need to know." },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="text-sm font-medium text-primary">FAQ</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Questions & answers</h1>
      <p className="mt-3 text-muted-foreground">Everything you might want to know about CreatorBoost AI.</p>
      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
