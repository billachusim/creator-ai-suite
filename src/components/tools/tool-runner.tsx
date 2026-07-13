import { useRef, useState } from "react";
import { toast } from "sonner";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { Tool } from "@/lib/tools/registry";

export function ToolRunner({ tool }: { tool: Tool }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    tool.fields?.forEach((f) => {
      if (f.type === "select" && f.options?.length) init[f.name] = f.options[0].value;
      else init[f.name] = "";
    });
    return init;
  });
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    // basic client-side required check
    for (const f of tool.fields ?? []) {
      if (f.required && !values[f.name]?.trim()) {
        toast.error(`Please fill in ${f.label.toLowerCase()}.`);
        return;
      }
    }
    setOutput("");
    setRunning(true);
    abortRef.current = new AbortController();

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      const res = await fetch(`/api/generate/${tool.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ input: values }),
        signal: abortRef.current.signal,
      });
      if (!res.ok || !res.body) {
        const text = await res.text().catch(() => "");
        if (res.status === 429) toast.error("Rate limit reached. Please try again shortly.");
        else if (res.status === 402) toast.error("AI credits exhausted for this workspace.");
        else toast.error(text || "Generation failed. Try again.");
        setRunning(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setOutput(acc);
      }
    } catch (err) {
      if ((err as { name?: string })?.name !== "AbortError") {
        toast.error("Something went wrong.");
      }
    } finally {
      setRunning(false);
    }
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <form
        onSubmit={handleGenerate}
        className="lg:col-span-2 space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-card"
      >
        <h2 className="text-lg font-semibold tracking-tight">Inputs</h2>
        {tool.fields?.map((f) => (
          <div key={f.name} className="space-y-1.5">
            <Label htmlFor={f.name}>
              {f.label}
              {f.required && <span className="text-primary"> *</span>}
            </Label>
            {f.type === "textarea" ? (
              <Textarea
                id={f.name}
                rows={f.rows ?? 4}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            ) : f.type === "select" ? (
              <Select
                value={values[f.name] ?? ""}
                onValueChange={(val) => setValues((v) => ({ ...v, [f.name]: val }))}
              >
                <SelectTrigger id={f.name}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {f.options?.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={f.name}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <Button
          type="submit"
          disabled={running}
          className="w-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant hover:opacity-90"
        >
          {running ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" /> Generate
            </>
          )}
        </Button>
      </form>

      <div className="lg:col-span-3 rounded-2xl border border-border/60 bg-card p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {tool.outputLabel ?? "Result"}
          </h2>
          <Button size="sm" variant="outline" onClick={handleCopy} disabled={!output}>
            {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
            Copy
          </Button>
        </div>
        {output ? (
          <pre className="mt-4 max-h-[560px] overflow-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
            {output}
          </pre>
        ) : (
          <div className="mt-4 grid min-h-[320px] place-items-center rounded-xl border border-dashed border-border/60 bg-surface-muted/40 p-8 text-center">
            <div>
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-elegant">
                <Sparkles className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-medium">Your AI output will stream here</p>
              <p className="text-xs text-muted-foreground">Fill in the fields and hit generate.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
