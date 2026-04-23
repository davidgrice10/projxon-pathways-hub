import { motion } from "framer-motion";
import BrandHeader from "@/components/BrandHeader";
import HeroPanel from "@/components/HeroPanel";
import KpiGrid from "@/components/KpiGrid";
import ImpactExplanation from "@/components/ImpactExplanation";
import EcosystemMap from "@/components/EcosystemMap";
import ProgramStack from "@/components/ProgramStack";
import WidgetPanel from "@/components/WidgetPanel";
import {
  Zap, Star, Award, Globe, TrendingUp, Handshake,
  DollarSign, Palette, Megaphone, Target
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Hero */}
        <HeroPanel />

        {/* KPIs */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          <KpiGrid />
          <ImpactExplanation />
        </motion.div>

        {/* Ecosystem Map */}
        <section className="rounded-2xl border border-border bg-card p-6 md:p-10">
          <EcosystemMap />
        </section>

        {/* Program Stack */}
        <motion.section
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >
          <ProgramStack />
        </motion.section>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "What PROJXON Delivers", icon: Zap, color: "gold" as const, items: ["Workforce development programs", "Internship and career pipeline creation", "Professional training and upskilling", "University-to-employer connection systems", "Large-scale events and workshops", "Digital learning and content platforms"] },
            { title: "Next-Generation Internship Platform", subtitle: "MIP", icon: Star, color: "blue" as const, items: ["Standardized internship frameworks", "Company ratings and assessments (1–5 stars)", "Transparent evaluation of opportunities", "Improved matching between talent and employers"], description: "A new benchmark for internship quality and career readiness." },
            { title: "Value for Organizations", icon: Award, color: "green" as const, items: ["Scale teams efficiently through structured talent pipelines", "Access pre-trained, adaptable workforce candidates", "Strengthen company culture through development programs", "Convert small teams into scalable operations"] },
            { title: "Driving Workforce Growth", icon: Target, color: "orange" as const, description: "PROJXON measures success by the number of individuals who grow their careers through its ecosystem.", items: ["Participation in programs", "Event and workshop attendance", "Completion of online learning", "Placement into career opportunities"] },
            { title: "Global Presence", icon: Globe, color: "gold" as const, items: ["Las Vegas Headquarters (5-story facility)", "Offices across the United States", "International expansion", "Annual large-scale convention in Las Vegas"] },
            { title: "Growth Strategy", icon: TrendingUp, color: "blue" as const, items: ["Expand university partnerships", "Grow employer network and hiring pipelines", "Scale programs and training systems", "Increase access through digital platforms", "Deliver high-impact in-person experiences"] },
            { title: "Partnership Network", icon: Handshake, color: "green" as const, description: "Partnerships are the core engine of PROJXON's growth and impact.", items: ["University Partnerships: 500+", "Employment Partnerships: 5,000+"] },
            { title: "Growth & Investment", icon: DollarSign, color: "gold" as const, items: ["State grant funding secured", "Matching investment opportunities", "Strong partnership-driven resource model", "High-growth trajectory across programs and ecosystem"] },
            { title: "Brand Positioning", subtitle: "Workforce development ecosystem for the modern economy", icon: Palette, color: "blue" as const, items: ["Integrated approach across education, training, and employment", "Scalable systems for talent development", "Focus on adaptability and real-world readiness", "Strong emphasis on people, culture, and connection"] },
            { title: "Engagement Channels", icon: Megaphone, color: "orange" as const, description: "Blending digital and in-person experiences to create high-impact engagement at scale.", items: ["In-person conventions and events", "Workshops and training sessions", "Online learning platforms", "Content and media"] },
          ].map((widget, i) => (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.45 }}
            >
              <WidgetPanel {...widget} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center py-8 border-t border-border"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm font-heading">PROJXON Ecosystem Dashboard</p>
        </motion.footer>
      </div>
    </div>
  );
}
