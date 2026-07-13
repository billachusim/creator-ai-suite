import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "lucide-react";

export function WaitlistForm({ toolSlug, toolName }: { toolSlug: string; toolName: string }) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <form
      className="rounded-2xl border border-border/60 bg-card p-6 shadow-card"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!email) return;
        setSubmitting(true);
        const { error } = await supabase
          .from("waitlist")
          .insert({ tool_slug: toolSlug, email });
        setSubmitting(false);
        if (error) {
          toast.error("Couldn't join the waitlist. Try again.");
          return;
        }
        setDone(true);
        setEmail("");
        toast.success(`You're on the list for ${toolName}.`);
      }}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold">Get early access to {toolName}</h3>
          <p className="text-sm text-muted-foreground">Be first in line when we launch. No spam, ever.</p>
        </div>
      </div>
      {done ? (
        <p className="mt-5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          You're on the waitlist. We'll email you the moment it's live.
        </p>
      ) : (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="waitlist-email" className="sr-only">Email</Label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90"
          >
            {submitting ? "Joining…" : "Join waitlist"}
          </Button>
        </div>
      )}
    </form>
  );
}
