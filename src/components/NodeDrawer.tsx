import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { nodeDetails, type NodeStatus } from "@/data/ecosystemNodes";

interface NodeDrawerProps {
  nodeLabel: string | null;
  onClose: () => void;
}

const statusStyles: Record<NodeStatus, string> = {
  Active: "bg-emerald-400/10 text-emerald-400 border border-emerald-400/30",
  "In Development": "bg-orange-400/10 text-orange-400 border border-orange-400/30",
  Planned: "bg-muted text-muted-foreground border border-border",
};

export default function NodeDrawer({ nodeLabel, onClose }: NodeDrawerProps) {
  const detail = nodeLabel ? nodeDetails[nodeLabel] : null;
  const open = !!nodeLabel;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.aside
            key="drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-amber-400/20 z-50 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Decorative top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-6 pt-6 pb-4 border-b border-border">
              <div className="min-w-0 flex-1">
                <h3 className="font-heading font-bold text-xl text-foreground leading-tight truncate">
                  {detail ? detail.name : nodeLabel}
                </h3>
              </div>
              {detail && (
                <span className={`shrink-0 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full ${statusStyles[detail.status]}`}>
                  {detail.status}
                </span>
              )}
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {detail ? (
                <>
                  <span className="inline-block text-[10px] uppercase tracking-widest-custom px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border">
                    {detail.layer}
                  </span>
                  <p className="text-sm text-amber-400/80 italic">{detail.tagline}</p>

                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-400 font-heading mb-1">What it is</p>
                    <p className="text-sm text-foreground leading-snug">{detail.sections.what}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-400 font-heading mb-1">Why it matters</p>
                    <p className="text-sm text-foreground leading-snug">{detail.sections.why}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-400 font-heading mb-1.5">How it connects</p>
                    <ul className="space-y-1.5">
                      {detail.sections.connects.map((c, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-start gap-2 text-sm text-foreground"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {detail.metrics && detail.metrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {detail.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-amber-400/15 bg-muted/30 p-3 text-center"
                        >
                          <p className="text-xl font-bold text-amber-400 tabular-nums">{m.value}</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No additional details available for this node yet.
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 pb-6 px-6">
              <p className="text-xs text-muted-foreground/50 italic">
                Part of the PROJXON Ecosystem
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
