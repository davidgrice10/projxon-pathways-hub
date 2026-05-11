import { motion } from "framer-motion";
import ProjectLogo from "@/components/ProjectLogo";

const partners = [
  "Northeastern University",
  "Amazon AWS",
  "US Chamber of Commerce",
  "HubSpot",
  "Department of Defense",
  "Fairleigh Dickinson",
  "Drexel University",
  "SBDC",
  "Vets in Tech",
  "Prime Corporate Services",
  "App Forge Solutions",
  "Claremont Graduate",
];

function PartnerSet() {
  return (
    <div className="flex items-center shrink-0">
      <span className="mx-2">
        <ProjectLogo variant="strip" />
      </span>
      {partners.map((p) => (
        <span
          key={p}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/50 text-xs text-muted-foreground/70 whitespace-nowrap mx-2 hover:border-amber-400/30 hover:text-foreground transition-all duration-200"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

export default function PartnerStrip() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8 }}
      className="py-4 overflow-hidden"
    >
      <div className="flex justify-center mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-amber-400/20 bg-amber-400/5 text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400/75">
          Trusted Partners
        </span>
      </div>
      <div className="overflow-hidden relative">
        <div className="flex w-max animate-marquee">
          <PartnerSet />
          <PartnerSet />
        </div>
      </div>
    </motion.div>
  );
}
