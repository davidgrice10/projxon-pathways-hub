import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageSkeleton from "@/components/PageSkeleton";
import NodeDrawer from "@/components/NodeDrawer";
import BrandHeader from "@/components/BrandHeader";
import ValueBanner from "@/components/ValueBanner";
import CountdownPanel from "@/components/CountdownPanel";
import HeroPanel from "@/components/HeroPanel";
import KpiGrid from "@/components/KpiGrid";
import ImpactExplanation from "@/components/ImpactExplanation";
import EcosystemMap from "@/components/EcosystemMap";
import ProgramStack from "@/components/ProgramStack";
import WidgetPanel from "@/components/WidgetPanel";
import ImpactSummary from "@/components/ImpactSummary";
import SectionLabel from "@/components/SectionLabel";
import SectionBridge from "@/components/SectionBridge";
import {
  Zap, Star, Award, Globe, TrendingUp, Handshake,
  DollarSign, Palette, Megaphone, Target
} from "lucide-react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Index() {
  const [loaded, setLoaded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (selectedNode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedNode]);

  return (
    <>
      <AnimatePresence>{!loaded && <PageSkeleton key="skeleton" />}</AnimatePresence>
      {loaded && (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Brand */}
        <BrandHeader />

        {/* Value Banner */}
        <ValueBanner />

        {/* Countdown */}
        <CountdownPanel />

        {/* Hero */}
        <HeroPanel />

        {/* Ecosystem Section Label */}
        <SectionLabel
          eyebrow="Ecosystem"
          title="How the PROJXON Ecosystem Works"
          description="A connected system that develops talent and delivers workforce-ready teams to employers."
        />

        {/* Ecosystem Map */}
        <div className="overflow-x-auto w-full">
          <section
            style={{ boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)" }}
            className="overflow-x-auto rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-6 md:p-10 transition-all duration-300 ease-out"
          >
            <EcosystemMap onNodeClick={(label) => setSelectedNode(label)} />
          </section>
        </div>

        {/* Ecosystem node detail drawer */}
        <NodeDrawer nodeLabel={selectedNode} onClose={() => setSelectedNode(null)} />

        {/* Bridge to KPIs */}
        <SectionBridge text="This ecosystem drives measurable outcomes across people, partnerships, and organizations." />

        {/* KPIs */}
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px" }}>
          <KpiGrid />
          <ImpactExplanation />
        </motion.div>

        {/* Program Stack */}
        <motion.section
          style={{ boxShadow: "inset 0 1px 0 0 rgba(255,210,80,0.07)" }}
          className="rounded-2xl border border-amber-400/15 hover:border-amber-400/35 bg-card p-6 md:p-8 transition-all duration-300 ease-out"
          variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "0px" }}
        >
          <ProgramStack />
        </motion.section>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
              viewport={{ once: true, margin: "0px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.45 }}
            >
              <WidgetPanel {...widget} />
            </motion.div>
          ))}
        </div>

        {/* Impact Summary */}
        <ImpactSummary />

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
      )}
    </>
  );
}

