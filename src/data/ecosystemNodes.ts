export type NodeStatus = "Active" | "In Development" | "Planned";
export type NodeColor = "gold" | "blue" | "green" | "orange";
export type NodeLayer = "B2C" | "B2B" | "Core";

export interface NodeSections {
  what: string;
  why: string;
  connects: string[];
}

export interface NodeDetail {
  name: string;
  tagline: string;
  description: string;
  status: NodeStatus;
  color: NodeColor;
  layer: NodeLayer;
  sections: NodeSections;
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
    sections: {
      what: "Parent company incubating the full ecosystem.",
      why: "Drives the workforce development mission.",
      connects: ["Owns Momentum and all sub-brands", "Sets strategic direction"],
    },
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
    sections: {
      what: "Content & media brand that drives ecosystem awareness.",
      why: "Builds trust and attracts top-of-funnel talent.",
      connects: ["Feeds into Momentum Internship", "Powers B2C talent pipeline"],
    },
  },
  "Momentum Internship": {
    name: "Momentum Internship",
    tagline: "Entry Point",
    description:
      "The structured internship gateway into the PROJXON ecosystem. Provides standardized frameworks, company ratings, and transparent evaluation to match talent with opportunity.",
    status: "Active",
    color: "blue",
    layer: "B2C",
    sections: {
      what: "Standardized internship platform with company ratings.",
      why: "Sets a new benchmark for career readiness and matching.",
      connects: ["Sits between Phelan and Growth Advisory", "Pipelines talent into Momentum"],
    },
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
    sections: {
      what: "Mentorship and skill-building for emerging professionals.",
      why: "Accelerates careers beyond the internship stage.",
      connects: ["Bridges Internship to Coaching", "Develops talent for partner orgs"],
    },
  },
  "Momentum Coaching": {
    name: "Momentum Coaching",
    tagline: "Coaching Layer",
    description:
      "1:1 and group coaching programs that accelerate individual growth, leadership development, and career readiness.",
    status: "Active",
    color: "blue",
    layer: "B2C",
    sections: {
      what: "1-on-1 coaching for leadership and performance.",
      why: "Deepens long-term growth and retention.",
      connects: ["Top of B2C development stack", "Feeds leaders into Momentum"],
    },
  },
  MOMENTUM: {
    name: "MOMENTUM",
    tagline: "Performance System — Learning, Community, Implementation",
    description:
      "The core performance operating system bridging B2C talent development and B2B business delivery. Where individuals move from learning to doing.",
    status: "Active",
    color: "gold",
    layer: "Core",
    sections: {
      what: "Central performance hub for learning and community.",
      why: "Connects B2C talent and B2B business tracks.",
      connects: ["Hub for every ecosystem node", "Powered by Ivory.io (GoHighLevel)"],
    },
  },
  "Momentum Office Parties": {
    name: "Momentum Office Parties",
    tagline: "Networking & Events",
    description:
      "High-energy in-person networking events that build community, surface opportunities, and connect talent with employers in a dynamic setting.",
    status: "Active",
    color: "orange",
    layer: "Core",
    sections: {
      what: "In-person networking and culture events.",
      why: "Builds community across the ecosystem.",
      connects: ["Activates Momentum members", "Bridges B2C and B2B audiences"],
    },
  },
  "Consulting System": {
    name: "Consulting System",
    tagline: "Client Delivery",
    description:
      "PROJXON's B2B consulting arm that delivers workforce solutions, talent pipelines, and organizational development services directly to employer partners.",
    status: "Active",
    color: "green",
    layer: "B2B",
    sections: {
      what: "B2B consulting that delivers business transformation.",
      why: "Primary revenue engine for the ecosystem.",
      connects: ["Productized through ORKA OS", "Powered by Momentum frameworks"],
    },
  },
  "Operating System": {
    name: "Operating System",
    tagline: "Business Framework",
    description:
      "The internal operational infrastructure that standardizes how PROJXON scales its programs, manages partners, and maintains quality across the ecosystem.",
    status: "Active",
    color: "green",
    layer: "B2B",
    sections: {
      what: "Internal operations and team management framework.",
      why: "Scales small teams into mature operations.",
      connects: ["Underpins all consulting work", "Feeds back into Momentum"],
    },
  },
  "Michelin Method": {
    name: "Michelin Method",
    tagline: "Management & Production",
    description:
      "A proprietary management and production framework adapted from high-performance standards to drive consistent output across teams and client engagements.",
    status: "Active",
    color: "green",
    layer: "B2B",
    sections: {
      what: "Quality and production methodology framework.",
      why: "Sets the excellence standard across delivery.",
      connects: ["Codified inside ORKA OS", "Used across consulting projects"],
    },
  },
  "ORKA OS": {
    name: "ORKA OS",
    tagline: "B2B SaaS — In Development",
    description:
      "PROJXON's forthcoming B2B SaaS platform that will systemize talent pipeline management, partner integrations, and workforce analytics for employer clients.",
    status: "In Development",
    color: "orange",
    layer: "B2B",
    sections: {
      what: "B2B SaaS platform productizing consulting IP.",
      why: "Turns services into scalable software revenue.",
      connects: ["Built on Michelin Method", "Distributed via Momentum"],
    },
    metrics: [{ label: "Stage", value: "In Development" }],
  },
};
