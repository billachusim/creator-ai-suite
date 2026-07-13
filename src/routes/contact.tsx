import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact CreatorBoost AI" },
      { name: "description", content: "Get in touch with the CreatorBoost AI team. Partnerships, press, feedback, or team plan enquiries." },
      { property: "og:title", content: "Contact CreatorBoost AI" },
      { property: "og:description", content: "Partnerships, press, feedback." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="text-sm font-medium text-primary">Contact</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Get in touch</h1>
      <p className="mt-3 text-muted-foreground">Partnerships, press, feedback, or Team plan enquiries — drop us a line.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-card md:col-span-1">
          <Mail className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-medium">Email</p>
          <a className="text-sm text-muted-foreground hover:text-foreground" href="mailto:hello@creatorboost.ai">hello@creatorboost.ai</a>
          <MessageCircle className="mt-6 h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-medium">Response time</p>
          <p className="text-sm text-muted-foreground">Under 24 hours on weekdays.</p>
        </div>

        <form
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-card md:col-span-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setSending(true);
            // Store contact as a special waitlist row so we don't lose it
            const { error } = await supabase.from("waitlist").insert({
              tool_slug: "contact:" + message.slice(0, 60),
              email,
            });
            setSending(false);
            if (error) {
              toast.error("Couldn't send. Try again.");
              return;
            }
            setDone(true);
            setEmail("");
            setMessage("");
            toast.success("Message received. We'll be in touch.");
          }}
        >
          {done ? (
            <p className="text-sm text-muted-foreground">Thanks — we got your message. We'll be back within 24 hours.</p>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Your email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90"
              >
                {sending ? "Sending…" : "Send message"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
