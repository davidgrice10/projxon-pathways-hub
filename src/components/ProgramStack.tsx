import { motion } from "framer-motion";
import { Layers, Sparkles, BookOpen, Monitor } from "lucide-react";

const layers = [
  { name: "Experiences", icon: Sparkles, items: ["Large-scale conventions (Las Vegas flagship)", "Workshops and in-person events"], color: "border-eco-orange" },
  { name: "Programs", icon: BookOpen, items: ["Internship programs (MIP)", "Workforce training pathways"], color: "border-eco-blue" },
  { name: "Digital", icon: Monitor, items: ["Online courses", "Video and educational content"], color: "border-eco-green" },
];

export default function ProgramStack() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <Layers className="text-primary" size={20} />
        <p className="text-muted-foreground tracking-widest-custom text-xs uppercase font-heading">Program & Experience Stack</p>
      </div>
      <div className="space-y-3">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className={`rounded-xl border-l-4 ${layer.color} bg-card border border-border p-4 hover:bg-muted/30 transition-colors`}
          >
            <div className="flex items-center gap-2 mb-2">
              <layer.icon size={16} className="text-foreground" />
              <h4 className="font-heading font-semibold text-sm">{layer.name}</h4>
            </div>
            <ul className="space-y-1">
              {layer.items.map((item, j) => (
                <li key={j} className="text-sm text-muted-foreground pl-6">• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
