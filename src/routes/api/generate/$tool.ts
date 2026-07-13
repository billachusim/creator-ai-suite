import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { getTool } from "@/lib/tools/registry";

const BodySchema = z.object({
  input: z.record(z.string(), z.string().max(4000)),
});

export const Route = createFileRoute("/api/generate/$tool")({
  server: {
    handlers: {
      POST: async ({ request, params }) => {
        const tool = getTool(params.tool);
        if (!tool || tool.status !== "live" || !tool.prompt) {
          return new Response("Tool not available", { status: 404 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("Missing LOVABLE_API_KEY", { status: 500 });
        }

        let parsed;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch {
          return new Response("Invalid request body", { status: 400 });
        }

        const authHeader = request.headers.get("authorization");
        const token = authHeader?.startsWith("Bearer ")
          ? authHeader.slice(7)
          : null;

        const { system, user } = tool.prompt(parsed.input);
        const gateway = createLovableAiGatewayProvider(key);
        const model = gateway("openai/gpt-5.5");

        const result = streamText({
          model,
          system,
          prompt: user,
          providerOptions: { lovable: { service_tier: "priority" } },
          onFinish: async ({ text }) => {
            if (!token || token.split(".").length !== 3) return;
            try {
              const { supabaseAdmin } = await import(
                "@/integrations/supabase/client.server"
              );
              const { data } = await supabaseAdmin.auth.getUser(token);
              const userId = data.user?.id;
              if (!userId) return;
              await supabaseAdmin.from("generations").insert({
                user_id: userId,
                tool_slug: tool.slug,
                input: parsed.input,
                output: { text },
              });
            } catch (err) {
              console.error("Failed to persist generation:", err);
            }
          },
        });

        return result.toTextStreamResponse();
      },
    },
  },
});
