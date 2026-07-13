// The full CreatorBoost AI tool catalog. Every tool has an SEO landing page.
// Tools with status "live" run real AI generations; "waitlist" tools show a
// signup form until we ship their generator.

import type { LucideIcon } from "lucide-react";
import {
  Youtube,
  Image as ImageIcon,
  FileText,
  ScrollText,
  ChartBar,
  Instagram,
  MessageCircle,
  Hash,
  Zap,
  Sparkles,
  Calendar,
  Repeat,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  PenLine,
  Search,
  Mic,
  RefreshCw,
  Fish,
  MousePointerClick,
  Megaphone,
  ShoppingBag,
  LayoutTemplate,
} from "lucide-react";

export type ToolCategory =
  | "YouTube"
  | "Instagram"
  | "TikTok"
  | "LinkedIn"
  | "Twitter"
  | "Facebook"
  | "Writing"
  | "SEO"
  | "Strategy"
  | "Ads"
  | "Ecommerce";

export type ToolField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  rows?: number;
};

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  category: ToolCategory;
  icon: LucideIcon;
  status: "live" | "waitlist";
  fields?: ToolField[];
  prompt?: (input: Record<string, string>) => { system: string; user: string };
  outputLabel?: string;
  featured?: boolean;
  popularity?: number;
};

const tone = {
  name: "tone",
  label: "Tone",
  type: "select" as const,
  options: [
    { label: "Punchy", value: "punchy" },
    { label: "Educational", value: "educational" },
    { label: "Funny", value: "funny" },
    { label: "Inspirational", value: "inspirational" },
    { label: "Professional", value: "professional" },
    { label: "Luxury", value: "luxury" },
  ],
};

export const TOOLS: Tool[] = [
  {
    slug: "youtube-title-generator",
    name: "YouTube Title Generator",
    tagline: "20 click-worthy titles in seconds.",
    description:
      "Generate scroll-stopping YouTube titles engineered for high CTR. Get 20 options tuned to your topic, keywords, and audience — with an SEO score and a recommended pick.",
    seoTitle: "Free AI YouTube Title Generator — 20 High-CTR Titles Instantly",
    seoDescription:
      "Create 20 clickable, SEO-optimized YouTube titles in seconds. Free AI title generator with CTR predictions and best-pick recommendations.",
    category: "YouTube",
    icon: Youtube,
    status: "live",
    featured: true,
    popularity: 98,
    outputLabel: "Titles",
    fields: [
      { name: "topic", label: "Video topic", type: "text", required: true, placeholder: "e.g. How I grew my channel from 0 to 100k" },
      { name: "keywords", label: "Keywords (optional)", type: "text", placeholder: "youtube growth, algorithm, seo" },
      { name: "audience", label: "Target audience (optional)", type: "text", placeholder: "aspiring creators" },
    ],
    prompt: ({ topic, keywords, audience }) => ({
      system:
        "You are a world-class YouTube title strategist trained on the top 1% of viral videos. You write punchy, curiosity-driven titles that maximize CTR without clickbait. Titles must be under 70 characters and use proven frameworks (numbers, contrast, insider secrets, transformation, warning).",
      user: `Generate exactly 20 diverse YouTube titles for a video about: "${topic}".
Keywords to weave in naturally: ${keywords || "(none)"}.
Target audience: ${audience || "general creators"}.

Format:
1. Title
2. Title
...
20. Title

Then add:
🏆 Best pick: <one of the 20 above>
Why: <one sentence explaining why it wins on curiosity + CTR + SEO>
SEO score: <0-100>
Predicted CTR: <low | medium | high | very high>`,
    }),
  },
  {
    slug: "youtube-thumbnail-analyzer",
    name: "YouTube Thumbnail Analyzer",
    tagline: "Score any thumbnail out of 100.",
    description:
      "Upload a thumbnail and get an instant AI analysis of clickability, contrast, text readability, facial emotion, and composition — plus concrete improvement suggestions.",
    seoTitle: "YouTube Thumbnail Analyzer — Free AI Clickability Score",
    seoDescription:
      "Analyze any YouTube thumbnail with AI. Get clickability, contrast, text, and composition scores plus improvement tips. Free tool for creators.",
    category: "YouTube",
    icon: ImageIcon,
    status: "waitlist",
  },
  {
    slug: "youtube-description-generator",
    name: "YouTube Description Generator",
    tagline: "SEO descriptions with chapters and CTAs.",
    description:
      "Write video descriptions that rank. Includes SEO copy, chapters with timestamps, calls-to-action, and optimized hashtags for maximum discoverability.",
    seoTitle: "Free YouTube Description Generator with Chapters & Hashtags",
    seoDescription:
      "Generate SEO-optimized YouTube descriptions with chapters, timestamps, CTAs, and hashtags in seconds. Free AI tool.",
    category: "YouTube",
    icon: FileText,
    status: "waitlist",
  },
  {
    slug: "youtube-script-writer",
    name: "YouTube Script Writer",
    tagline: "Hook, body, and CTA — done.",
    description:
      "Full YouTube scripts with proven story structure: hook, body, storytelling beats, and a strong call-to-action. Choose Educational, Documentary, Entertainment, Review, or Tutorial styles.",
    seoTitle: "AI YouTube Script Writer — Full Scripts in Minutes",
    seoDescription:
      "Generate full YouTube scripts with hooks, storytelling, and CTAs. Choose from Educational, Documentary, Entertainment, Review, and Tutorial styles.",
    category: "YouTube",
    icon: ScrollText,
    status: "waitlist",
  },
  {
    slug: "youtube-channel-audit",
    name: "YouTube Channel Audit",
    tagline: "Deep AI audit of any channel.",
    description:
      "Get an AI-powered audit of any YouTube channel: branding, consistency, SEO, titles, thumbnails, growth opportunities, and content gaps.",
    seoTitle: "YouTube Channel Audit — Free AI Growth Report",
    seoDescription:
      "Get a full AI audit of any YouTube channel including SEO, branding, thumbnails, and growth opportunities. Free report.",
    category: "YouTube",
    icon: ChartBar,
    status: "waitlist",
  },
  {
    slug: "instagram-bio-optimizer",
    name: "Instagram Bio Optimizer",
    tagline: "A bio that converts followers.",
    description:
      "Rewrite your Instagram bio to attract your ideal audience. Get a stronger hook, clear CTA, keyword mix, emoji suggestions, and link recommendations.",
    seoTitle: "Free Instagram Bio Generator & Optimizer (AI)",
    seoDescription:
      "AI Instagram bio optimizer. Generate a bio with hook, CTA, keywords, and emojis. Free tool for creators and businesses.",
    category: "Instagram",
    icon: Instagram,
    status: "waitlist",
  },
  {
    slug: "instagram-caption-generator",
    name: "Instagram Caption Generator",
    tagline: "Captions that stop the scroll.",
    description:
      "Generate multiple Instagram captions in the tone you want. Funny, inspirational, professional, luxury, or educational — always on-brand.",
    seoTitle: "Free AI Instagram Caption Generator — Multiple Tones",
    seoDescription:
      "Generate scroll-stopping Instagram captions in seconds. Choose funny, inspirational, luxury, professional, or educational tones. Free tool.",
    category: "Instagram",
    icon: MessageCircle,
    status: "live",
    featured: true,
    popularity: 95,
    outputLabel: "Captions",
    fields: [
      { name: "topic", label: "What's the post about?", type: "textarea", required: true, rows: 3, placeholder: "e.g. Behind the scenes of my new product launch" },
      tone,
      { name: "audience", label: "Audience (optional)", type: "text", placeholder: "fitness enthusiasts, indie founders..." },
    ],
    prompt: ({ topic, tone, audience }) => ({
      system:
        "You are an elite Instagram content strategist. You write captions that stop scrolling, drive saves and shares, and match the brand voice perfectly. Use natural line breaks. Never sound like a bot.",
      user: `Write 6 Instagram captions in a ${tone} tone about: ${topic}.
Audience: ${audience || "general"}.
For each caption:
- Start with a scroll-stopping hook
- Keep it 40–120 words
- End with a clear CTA (comment / save / share / follow)
- Add 3–5 highly relevant hashtags on the last line

Number them 1–6.`,
    }),
  },
  {
    slug: "hashtag-generator",
    name: "Hashtag Generator",
    tagline: "Trending, low-comp, and evergreen sets.",
    description:
      "Generate 30 optimized hashtags for any platform. Grouped by low competition, medium competition, and trending — tuned to your topic, audience, and location.",
    seoTitle: "Free Hashtag Generator for Instagram, TikTok, YouTube",
    seoDescription:
      "AI hashtag generator with low-competition, medium-competition, and trending sets. Optimized for Instagram, TikTok, YouTube, and more.",
    category: "Instagram",
    icon: Hash,
    status: "live",
    featured: true,
    popularity: 92,
    outputLabel: "Hashtags",
    fields: [
      { name: "topic", label: "Topic or niche", type: "text", required: true, placeholder: "e.g. minimalist home decor" },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        options: [
          { label: "Instagram", value: "Instagram" },
          { label: "TikTok", value: "TikTok" },
          { label: "YouTube", value: "YouTube" },
          { label: "LinkedIn", value: "LinkedIn" },
          { label: "X (Twitter)", value: "X" },
        ],
      },
      { name: "location", label: "Location (optional)", type: "text", placeholder: "London, global, US..." },
    ],
    prompt: ({ topic, platform, location }) => ({
      system:
        "You are a hashtag researcher. You know competitive volume for social hashtags and only return tags that are actually used on the platform.",
      user: `Generate 30 optimized ${platform} hashtags for: ${topic}. Location bias: ${location || "global"}.
Group them into three clean sections. No commentary, just hashtags.

🔥 Trending (high volume)
#tag #tag ... (10 tags)

⚡ Medium competition
#tag #tag ... (10 tags)

🎯 Low competition (easy to rank)
#tag #tag ... (10 tags)`,
    }),
  },
  {
    slug: "tiktok-hook-generator",
    name: "TikTok Hook Generator",
    tagline: "First 3 seconds, sorted.",
    description:
      "Generate viral 3-second TikTok hooks and video openings that stop the scroll and pull viewers into your content. Perfect for Reels and Shorts too.",
    seoTitle: "Free TikTok Hook Generator — Viral 3-Second Openings",
    seoDescription:
      "AI-powered TikTok hook generator. Get 20 viral 3-second video openings for TikTok, Reels, and Shorts. Free tool.",
    category: "TikTok",
    icon: Zap,
    status: "live",
    featured: true,
    popularity: 90,
    outputLabel: "Hooks",
    fields: [
      { name: "topic", label: "Video topic", type: "text", required: true, placeholder: "e.g. I quit my 9-5 to build a SaaS" },
      { name: "audience", label: "Audience (optional)", type: "text" },
    ],
    prompt: ({ topic, audience }) => ({
      system:
        "You are a viral TikTok scriptwriter. You know the top-performing hook patterns: pattern interrupt, controversial take, curiosity gap, transformation, insider secret, list format, myth-busting.",
      user: `Generate 20 viral TikTok hooks (each 1 sentence, 3-second delivery) for a video about: ${topic}.
Audience: ${audience || "general Gen Z / Millennials"}.
Vary the frameworks. No numbering emojis, just plain "1." style.

After the 20 hooks, add:
🏆 Best pick: <one line>
Why it works: <one sentence>`,
    }),
  },
  {
    slug: "viral-content-idea-generator",
    name: "Viral Content Idea Generator",
    tagline: "100 ideas across trending angles.",
    description:
      "Generate 20 viral content ideas across trending, evergreen, and seasonal angles. Perfect for planning a week, a month, or a quarter of posts.",
    seoTitle: "Free Viral Content Idea Generator for Creators",
    seoDescription:
      "Get 20 viral content ideas across trending, evergreen, and seasonal angles. Free AI tool for creators, brands, and marketers.",
    category: "Strategy",
    icon: Sparkles,
    status: "live",
    featured: true,
    popularity: 88,
    outputLabel: "Ideas",
    fields: [
      { name: "niche", label: "Your niche", type: "text", required: true, placeholder: "e.g. personal finance for millennials" },
      {
        name: "platform",
        label: "Primary platform",
        type: "select",
        options: [
          { label: "YouTube", value: "YouTube" },
          { label: "Instagram", value: "Instagram" },
          { label: "TikTok", value: "TikTok" },
          { label: "LinkedIn", value: "LinkedIn" },
          { label: "X (Twitter)", value: "X" },
        ],
      },
    ],
    prompt: ({ niche, platform }) => ({
      system:
        "You are a content strategist for top creators. You generate ideas that get clicks, saves, and shares.",
      user: `Generate 20 viral ${platform} content ideas for a creator in the ${niche} niche.

Group them:

🔥 Trending (7 ideas — capitalize on current attention)
📚 Evergreen (7 ideas — always relevant)
📅 Seasonal (6 ideas — tied to a moment / month / event)

For each idea write one line: title / angle. No fluff.`,
    }),
  },
  {
    slug: "content-calendar-generator",
    name: "Content Calendar Generator",
    tagline: "Weekly, monthly, and quarterly plans.",
    description:
      "Generate a full content calendar for the week, month, or quarter. Export to CSV or Google Calendar.",
    seoTitle: "Free AI Content Calendar Generator (Weekly & Monthly)",
    seoDescription:
      "AI content calendar generator for creators. Plan weekly, monthly, and quarterly content in seconds. Free tool.",
    category: "Strategy",
    icon: Calendar,
    status: "waitlist",
  },
  {
    slug: "ai-content-repurposer",
    name: "AI Content Repurposer",
    tagline: "One idea, ten formats.",
    description:
      "Turn a blog, transcript, podcast, or tweet into Instagram posts, LinkedIn posts, threads, TikTok scripts, Shorts, newsletter, and more.",
    seoTitle: "AI Content Repurposer — 1 Post to 10 Formats",
    seoDescription:
      "Turn any blog, video, or podcast into Instagram, LinkedIn, TikTok, Twitter, and newsletter content instantly with AI.",
    category: "Strategy",
    icon: Repeat,
    status: "waitlist",
  },
  {
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    tagline: "Thought-leadership that lands.",
    description:
      "Generate LinkedIn posts, carousels, and thought-leadership content in a voice that fits your industry.",
    seoTitle: "Free AI LinkedIn Post Generator — Thought Leadership",
    seoDescription:
      "Write engaging LinkedIn posts, carousels, and thought-leadership content in seconds with AI.",
    category: "LinkedIn",
    icon: Linkedin,
    status: "waitlist",
  },
  {
    slug: "twitter-thread-generator",
    name: "X (Twitter) Thread Generator",
    tagline: "Threads that go viral.",
    description:
      "Generate X threads with a strong hook, tight body, and an engagement-driving ending. Perfect for growth.",
    seoTitle: "Free AI X (Twitter) Thread Generator",
    seoDescription:
      "AI Twitter thread generator with viral hooks, tight structure, and strong endings. Free tool.",
    category: "Twitter",
    icon: Twitter,
    status: "waitlist",
  },
  {
    slug: "facebook-post-generator",
    name: "Facebook Post Generator",
    tagline: "Engaging posts for pages and groups.",
    description:
      "Generate high-engagement Facebook posts for businesses, creators, communities, and brands.",
    seoTitle: "Free AI Facebook Post Generator for Pages & Groups",
    seoDescription:
      "Write engaging Facebook posts for businesses, creators, and communities in seconds with AI.",
    category: "Facebook",
    icon: Facebook,
    status: "waitlist",
  },
  {
    slug: "email-newsletter-generator",
    name: "Email Newsletter Generator",
    tagline: "Subject lines that get opened.",
    description:
      "Generate email newsletters with high-converting subject lines, preview text, body copy, and a clear CTA.",
    seoTitle: "Free AI Email Newsletter Generator",
    seoDescription:
      "AI newsletter generator with subject lines, preview text, body, and CTA. Free tool for creators and marketers.",
    category: "Writing",
    icon: Mail,
    status: "waitlist",
  },
  {
    slug: "blog-writer",
    name: "AI Blog Writer",
    tagline: "SEO articles with schema and FAQs.",
    description:
      "Generate SEO-optimized blog articles with headings, FAQs, meta tags, internal linking suggestions, and JSON-LD schema.",
    seoTitle: "AI Blog Writer — SEO Articles with Schema & FAQs",
    seoDescription:
      "Generate SEO-optimized blog articles with headings, FAQs, meta tags, and schema markup. Free AI writer.",
    category: "Writing",
    icon: PenLine,
    status: "waitlist",
  },
  {
    slug: "ai-seo-optimizer",
    name: "AI SEO Optimizer",
    tagline: "On-page SEO in one click.",
    description:
      "Analyze keyword density, readability, headings, meta tags, internal links, and search intent — then rewrite for maximum ranking.",
    seoTitle: "Free AI SEO Optimizer — On-Page Analysis & Rewrite",
    seoDescription:
      "AI SEO optimizer for on-page analysis: keyword density, readability, headings, meta tags, search intent.",
    category: "SEO",
    icon: Search,
    status: "waitlist",
  },
  {
    slug: "ai-brand-voice-trainer",
    name: "AI Brand Voice Trainer",
    tagline: "AI that sounds like you.",
    description:
      "Upload your best content and train an AI that writes in your unique voice. Consistent brand tone across every platform.",
    seoTitle: "AI Brand Voice Trainer — Content in Your Unique Voice",
    seoDescription:
      "Train an AI on your best content so every future post sounds unmistakably like you. Consistent brand voice.",
    category: "Writing",
    icon: Mic,
    status: "waitlist",
  },
  {
    slug: "ai-content-rewrite-tool",
    name: "AI Content Rewrite Tool",
    tagline: "Rewrite in any tone.",
    description:
      "Rewrite content into professional, friendly, luxury, funny, persuasive, minimal, or human-like tones with one click.",
    seoTitle: "Free AI Content Rewriter — Any Tone, Any Style",
    seoDescription:
      "AI content rewriter: professional, friendly, luxury, funny, persuasive, minimal, human-like. Free tool.",
    category: "Writing",
    icon: RefreshCw,
    status: "waitlist",
  },
  {
    slug: "hook-generator",
    name: "Hook Generator",
    tagline: "100 attention-grabbing openings.",
    description:
      "Generate viral opening hooks for YouTube, TikTok, Instagram, LinkedIn, and Facebook. Any topic. Any niche.",
    seoTitle: "Free AI Hook Generator for YouTube, TikTok & Instagram",
    seoDescription:
      "AI hook generator with 100 attention-grabbing opening lines for YouTube, TikTok, Instagram, LinkedIn, Facebook.",
    category: "Writing",
    icon: Fish,
    status: "waitlist",
  },
  {
    slug: "cta-generator",
    name: "CTA Generator",
    tagline: "Calls-to-action that convert.",
    description:
      "Generate powerful CTAs for sales, subscriptions, comments, likes, shares, downloads, and bookings.",
    seoTitle: "Free AI CTA Generator — High-Converting Call-to-Action",
    seoDescription:
      "AI CTA generator for sales, subscriptions, downloads, bookings, and more. Free tool.",
    category: "Writing",
    icon: MousePointerClick,
    status: "waitlist",
  },
  {
    slug: "ai-ad-copy-generator",
    name: "AI Ad Copy Generator",
    tagline: "Ads for Google, Meta, TikTok.",
    description:
      "Generate ad copy tuned for Google Ads, Facebook & Instagram Ads, TikTok Ads, and LinkedIn Ads.",
    seoTitle: "Free AI Ad Copy Generator — Google, Meta, TikTok, LinkedIn",
    seoDescription:
      "AI ad copy generator for Google Ads, Facebook, Instagram, TikTok, and LinkedIn campaigns.",
    category: "Ads",
    icon: Megaphone,
    status: "waitlist",
  },
  {
    slug: "ai-product-description-generator",
    name: "AI Product Description Generator",
    tagline: "Descriptions that sell.",
    description:
      "Generate optimized product descriptions for Shopify, WooCommerce, Amazon, Etsy, and more.",
    seoTitle: "AI Product Description Generator for Shopify & Amazon",
    seoDescription:
      "AI product description generator optimized for Shopify, WooCommerce, Amazon, Etsy, and more. Free tool.",
    category: "Ecommerce",
    icon: ShoppingBag,
    status: "waitlist",
  },
  {
    slug: "ai-landing-page-copy-generator",
    name: "AI Landing Page Copy Generator",
    tagline: "Headline to CTA, done.",
    description:
      "Generate landing page copy: headline, subheadline, benefits, features, testimonials, FAQ, and CTA.",
    seoTitle: "Free AI Landing Page Copy Generator",
    seoDescription:
      "AI landing page copy generator: headline, subheadline, benefits, features, testimonials, FAQ, CTA. Free tool.",
    category: "Writing",
    icon: LayoutTemplate,
    status: "waitlist",
  },
];

export const TOOLS_BY_SLUG: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.slug, t]),
);

export function getTool(slug: string): Tool | undefined {
  return TOOLS_BY_SLUG[slug];
}

export const CATEGORIES: ToolCategory[] = [
  "YouTube",
  "Instagram",
  "TikTok",
  "LinkedIn",
  "Twitter",
  "Facebook",
  "Writing",
  "SEO",
  "Strategy",
  "Ads",
  "Ecommerce",
];
