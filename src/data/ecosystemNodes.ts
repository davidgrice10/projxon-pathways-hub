export type NodeStatus = "Active" | "In Development" | "Planned";
export type NodeColor = "gold" | "blue" | "green" | "orange";
export type NodeLayer = "B2C" | "B2B" | "Core";

export interface NodeDetail {
  name: string;
  tagline: string;
  description: string;
  status: NodeStatus;
  color: NodeColor;
  layer: NodeLayer;
  metrics?: { label: string; value: string }[];
}

export const nodeDetails: Record<string, NodeDetail> = {
  PROJXON: {
    name: "PROJXON",
    tagline: "Incubator & Parent System",
    description:
      "The central operating entity that connects all programs, partners, and pipelines into one unified workforce development ecosystem.",
    status: "Active",
    color: "gold",
    layer: "Core",
    metrics: [
      { label: "Programs", value: "8+" },
      { label: "Partners", value: "500+" },
    ],
  },
  "The Phelan Focus": {
    name: "The Phelan Focus",
    tagline: "Top-of-Funnel Philosophy",
    description:
      "PROJXON's foundational methodology for attracting, qualifying, and converting talent prospects into active ecosystem participants.",
    status: "Active",
    color: "blue",
    layer: "B2C",
  },
  "Momentum Internship": {
    name: "Momentum Internship",
    tagline: "Entry Point",
    description:
      "The structured internship gateway into the PROJXON ecosystem. Provides standardized frameworks, company ratings, and transparent evaluation to match talent with opportunity.",
    status: "Active",
    color: "blue",
    layer: "B2C",
    metrics: [{ label: "Rating System", value: "1–5 Stars" }],
  },
  "Growth Advisory": {
    name: "Growth Advisory",
    tagline: "Development Layer",
    description:
      "Personalized advisory track that moves participants from internship completion into professional development and career scaling.",
    status: "Active",
    color: "blue",
    layer: "B2C",
  },
  "Momentum Coaching": {
    name: "Momentum Coaching",
    tagline: "Coaching Layer",
    description:
      "1:1 and group coaching programs that accelerate individual growth, leadership development, and career readiness.",
    status: "Active",
    color: "blue",
    layer: "B2C",
  },
  MOMENTUM: {
    name: "MOMENTUM",
    tagline: "Performance System — Learning, Community, Implementation",
    description:
      "The core performance operating system bridging B2C talent development and B2B business delivery. Where individuals move from learning to doing.",
    status: "Active",
    color: "gold",
    layer: "Core",
  },
  "Momentum Office Parties": {
    name: "Momentum Office Parties",
    tagline: "Networking & Events",
    description:
      "High-energy in-person networking events that build community, surface opportunities, and connect talent with employers in a dynamic setting.",
    status: "Active",
    color: "orange",
    layer: "Core",
  },
  "Consulting System": {
    name: "Consulting System",
    tagline: "Client Delivery",
    description:
      "PROJXON's B2B consulting arm that delivers workforce solutions, talent pipelines, and organizational development services directly to employer partners.",
    status: "Active",
    color: "green",
    layer: "B2B",
  },
  "Operating System": {
    name: "Operating System",
    tagline: "Business Framework",
    description:
      "The internal operational infrastructure that standardizes how PROJXON scales its programs, manages partners, and maintains quality across the ecosystem.",
    status: "Active",
    color: "green",
    layer: "B2B",
  },
  "Michelin Method": {
    name: "Michelin Method",
    tagline: "Management & Production",
    description:
      "A proprietary management and production framework adapted from high-performance standards to drive consistent output across teams and client engagements.",
    status: "Active",
    color: "green",
    layer: "B2B",
  },
  "ORKA OS": {
    name: "ORKA OS",
    tagline: "B2B SaaS — In Development",
    description:
      "PROJXON's forthcoming B2B SaaS platform that will systemize talent pipeline management, partner integrations, and workforce analytics for employer clients.",
    status: "In Development",
    color: "orange",
    layer: "B2B",
    metrics: [{ label: "Stage", value: "In Development" }],
  },
};
