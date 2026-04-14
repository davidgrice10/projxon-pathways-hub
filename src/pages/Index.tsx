import HeroPanel from "@/components/HeroPanel";
import KpiGrid from "@/components/KpiGrid";
import EcosystemMap from "@/components/EcosystemMap";
import ProgramStack from "@/components/ProgramStack";
import WidgetPanel from "@/components/WidgetPanel";
import {
  Zap, Star, Award, Globe, TrendingUp, Handshake,
  DollarSign, Palette, Megaphone, Target
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <HeroPanel />

        {/* KPIs */}
        <KpiGrid />

        {/* Ecosystem Map */}
        <section className="rounded-2xl border border-border bg-card p-6 md:p-10">
          <EcosystemMap />
        </section>

        {/* Program Stack */}
        <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <ProgramStack />
        </section>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <WidgetPanel
            title="What PROJXON Delivers"
            icon={Zap}
            color="gold"
            items={[
              "Workforce development programs",
              "Internship and career pipeline creation",
              "Professional training and upskilling",
              "University-to-employer connection systems",
              "Large-scale events and workshops",
              "Digital learning and content platforms",
            ]}
          />
          <WidgetPanel
            title="Next-Generation Internship Platform"
            subtitle="MIP"
            icon={Star}
            color="blue"
            items={[
              "Standardized internship frameworks",
              "Company ratings and assessments (1–5 stars)",
              "Transparent evaluation of opportunities",
              "Improved matching between talent and employers",
            ]}
            description="A new benchmark for internship quality and career readiness."
          />
          <WidgetPanel
            title="Value for Organizations"
            icon={Award}
            color="green"
            items={[
              "Scale teams efficiently through structured talent pipelines",
              "Access pre-trained, adaptable workforce candidates",
              "Strengthen company culture through development programs",
              "Convert small teams into scalable operations",
            ]}
          />
          <WidgetPanel
            title="Driving Workforce Growth"
            icon={Target}
            color="orange"
            description="PROJXON measures success by the number of individuals who grow their careers through its ecosystem."
            items={[
              "Participation in programs",
              "Event and workshop attendance",
              "Completion of online learning",
              "Placement into career opportunities",
            ]}
          />
          <WidgetPanel
            title="Global Presence"
            icon={Globe}
            color="gold"
            items={[
              "Las Vegas Headquarters (5-story facility)",
              "Offices across the United States",
              "International expansion",
              "Annual large-scale convention in Las Vegas",
            ]}
          />
          <WidgetPanel
            title="Growth Strategy"
            icon={TrendingUp}
            color="blue"
            items={[
              "Expand university partnerships",
              "Grow employer network and hiring pipelines",
              "Scale programs and training systems",
              "Increase access through digital platforms",
              "Deliver high-impact in-person experiences",
            ]}
          />
          <WidgetPanel
            title="Partnership Network"
            icon={Handshake}
            color="green"
            description="Partnerships are the core engine of PROJXON's growth and impact."
            items={["University Partnerships: 500+", "Employment Partnerships: 5,000+"]}
          />
          <WidgetPanel
            title="Growth & Investment"
            icon={DollarSign}
            color="gold"
            items={[
              "State grant funding secured",
              "Matching investment opportunities",
              "Strong partnership-driven resource model",
              "High-growth trajectory across programs and ecosystem",
            ]}
          />
          <WidgetPanel
            title="Brand Positioning"
            subtitle="Workforce development ecosystem for the modern economy"
            icon={Palette}
            color="blue"
            items={[
              "Integrated approach across education, training, and employment",
              "Scalable systems for talent development",
              "Focus on adaptability and real-world readiness",
              "Strong emphasis on people, culture, and connection",
            ]}
          />
          <WidgetPanel
            title="Engagement Channels"
            icon={Megaphone}
            color="orange"
            description="Blending digital and in-person experiences to create high-impact engagement at scale."
            items={[
              "In-person conventions and events",
              "Workshops and training sessions",
              "Online learning platforms",
              "Content and media",
            ]}
          />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm font-heading">PROJXON Ecosystem Dashboard</p>
        </footer>
      </div>
    </div>
  );
}
